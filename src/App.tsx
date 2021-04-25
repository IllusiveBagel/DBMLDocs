import Database from "./Pages/Database";
import Layout from "./Components/Layout";
import React from "react";
import Table from "./Pages/Table";
import { DBML } from "./Lib/Declarations";
import { DBML2JSON } from "./Lib/DBMLLib";
import { Route } from "react-router";

interface IAppProps {

}

interface IAppState {
  Json: DBML;
  HasData: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {
  static displayName = App.name;

  constructor(props: any) {
    super(props);
    this.state={
      Json: {} as DBML,
      HasData: false,
    };
  }

  componentDidMount() {
    this.GetData();
  }

  public async GetData() {
    const Data = await fetch('/Database/Example.dbml')
    .then((r) => r.text())
    .then(text  => {
      return text.toString();
    });

    const Json = DBML2JSON(Data);

    this.setState({
      Json: Json,
      HasData: true,
    })
  }

  render () {
    if (this.state.HasData === false){
      return(
        <h1>No Data</h1>
      );
    }

    return (
      <Layout Tables={this.state.Json.Tables}>
        <Route exact path='/'>
          <Database Project={this.state.Json.Project} DBType={this.state.Json.database_type} Note={this.state.Json.Note} />
        </Route>
        {this.state.Json.Tables.map(table => {
          return(
            <Route path={"/" + table.Name}>
              <Table Name={table.Name} Note={table.Note} />
            </Route>
          );
        })}
      </Layout>
    );
  }
}