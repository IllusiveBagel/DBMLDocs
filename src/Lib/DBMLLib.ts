import { DBML, Table } from "./Declarations";

export function DBML2JSON(dbml: string): DBML {
    const tablesIN = dbml.match(/(Table)[^]+?({)[^]+?(})/g);
    let tables: Table[] = [];

    tablesIN?.forEach((item, index) => {
        const columnsIN = item.match(/(?<={\r\n)[^]+?(?=})/g)?.toString().replace(/ {4}/g,' ').toString();
        console.log(columnsIN);
        var table: Table = {
            Name: item.match(/(?<=Table ).*\w/g)?.toString() as string,
            Columns: [],
            Note: item.match(/(?<=Note: ').*\w/g)?.toString() as string
        };

        tables.push(table);
    });

    const json: DBML = {
        Project: dbml.match(/(?<=Project ).*\w/g)?.toString() as string,
        database_type: dbml.match(/(?<=database_type: ').*\w/g)?.toString() as string,
        Note: dbml.match(/(?<=Note: ''')[^]+(?=''')/gm)?.toString() as string,
        Tables: tables,
    } as DBML;

    return json;
}