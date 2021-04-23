import Layout from "./Components/Layout";
import React from "react";
import { Route } from "react-router";
import { DBML2JSON } from "./Lib/DBMLLib";
import { DBML } from "./Lib/Declarations";
import Database from "./Pages/Database";

interface IAppProps {

}

interface IAppState {
  Json: DBML;
}

export default class App extends React.Component<IAppProps, IAppState> {
  static displayName = App.name;

  constructor(props: any) {
    super(props);
    this.state={
      Json: {} as DBML,
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
    })
  }

  render () {
    console.log(this.state.Json);
    return (
      <Layout>
        <Route exact path='/'>
          <Database Project={this.state.Json.Project} DBType={this.state.Json.database_type} Note={this.state.Json.Note} />
        </Route>
      </Layout>
    );
  }
}