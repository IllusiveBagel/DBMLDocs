import Layout from "./Components/Layout";
import React from "react";
import { Route } from "react-router";

interface IAppProps {

}

interface IAppState {

}

export default class App extends React.Component<IAppProps, IAppState> {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' />
      </Layout>
    );
  }
}