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
    GetData();
  }, []);

  const GetData = async () => {
    const Data = await fetch(`/Database/${config.DatabaseName}.dbml`)
      .then((r) => r.text())
      .then(text => {
        return text.toString();
      });

    const Json = DBML2JSON(Data);

    setJson(Json);
    setHasData(true);
  };

  const GetReferences = (tableName: string, References: Reference[]) => {
    var refs: Reference[] = [];

    if (References !== undefined) {
      References.forEach(ref => {
        if (ref.Primary.Table === tableName || ref.Secondary.Table === tableName) {
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
    <Layout Database={json}>
      <Routes>
        <Route
          path='/'
          element={
            <Database
              Project={json.Project}
              DBType={json.database_type}
              Tables={json.Tables}
              Note={json.Note}
              References={json.References}
              GetReferences={GetReferences}
            />
          }
        />
        {json.Tables.map((table, index) => {
          return (
            <Route
              path={"/" + table.Name}
              key={index}
              element={
                <Table
                  Name={table.Name}
                  Alias={table.Alias}
                  Columns={table.Columns}
                  Note={table.Note}
                  References={GetReferences(table.Name, json.References)}
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
