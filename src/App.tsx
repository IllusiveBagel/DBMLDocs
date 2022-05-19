import config from "./config.json";
import Database from "./pages/Database/Database";
import Layout from "./components/Layout/Layout";
import React, { useEffect, useState } from "react";
import Table from "./pages/Table/Table";
import { DBML, Reference } from "./lib/Declarations";
import { DBML2JSON } from "./lib/DBMLLib";
import { Route, Routes } from "react-router-dom";

function App() {
  const [json, setJson] = useState<DBML>({} as DBML);
  const [hasData, setHasData] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetch(`/Database/${config.DatabaseName}.dbml`)
      .then((r) => r.text())
      .then(text => {
        return text.toString();
      });

    const json = DBML2JSON(data);

    setJson(json);
    setHasData(true);
  };

  const getReferences = (tableName: string, references: Reference[]) => {
    var refs: Reference[] = [];

    if (references !== undefined) {
      references.forEach(ref => {
        if (ref.primary.table === tableName || ref.secondary.table === tableName) {
          refs.push(ref);
        }
      });
    }

    return refs;
  };

  if (hasData === false) {
    return (
      <h1>No Data</h1>
    );
  }

  return (
    <Layout database={json}>
      <Routes>
        <Route
          path='/'
          element={
            <Database
              project={json.project}
              dbType={json.databaseType}
              tables={json.tables}
              note={json.note}
              references={json.references}
              getReferences={getReferences}
            />
          }
        />
        {json.tables.map((table, index) => {
          return (
            <Route
              path={"/" + table.name}
              key={index}
              element={
                <Table
                  name={table.name}
                  alias={table.alias}
                  columns={table.columns}
                  note={table.note}
                  references={getReferences(table.name, json.references)}
                />
              }
            />
          );
        })}
      </Routes>
    </Layout>
  );
}

export default App;
