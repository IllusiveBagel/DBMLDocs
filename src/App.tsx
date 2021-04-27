import Database from "./Pages/Database";
import Layout from "./Components/Layout";
import React from "react";
import Table from "./Pages/Table";
import { DBML, Reference } from "./Lib/Declarations";
import { DBML2JSON } from "./Lib/DBMLLib";
import { Route } from "react-router";
import config from "./config.json";

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
        const Data = await fetch(`/Database/${config.DatabaseName}.dbml`)
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

    public GetReferences(tableName: string, References: Reference[]): Reference[] {
        var refs: Reference[] = [];

        if (References !== undefined) {
            References.forEach(ref => {
                if (ref.Primary.Table === tableName || ref.Secondary.Table === tableName) {
                    refs.push(ref);
                }
            });
        }

        return refs;
    }

    render () {
        if (this.state.HasData === false) {
            return(
                <h1>No Data</h1>
            );
        }

        return (
            <Layout Tables={this.state.Json.Tables} DBName={this.state.Json.Project}>
                <Route exact path='/'>
                    <Database
                        Project={this.state.Json.Project}
                        DBType={this.state.Json.database_type}
                        Tables={this.state.Json.Tables}
                        Note={this.state.Json.Note}
                        References={this.state.Json.References}
                        GetReferences={this.GetReferences}
                    />
                </Route>
                {this.state.Json.Tables.map((table, index) => {
                    return(
                        <Route path={"/" + table.Name} key={index}>
                            <Table
                                Name={table.Name}
                                Columns={table.Columns}
                                Note={table.Note}
                                References={this.GetReferences(table.Name, this.state.Json.References)}
                            />
                        </Route>
                    );
                })}
            </Layout>
        );
    }
}