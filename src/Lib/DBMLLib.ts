import { Column, DBML, Table } from "./Declarations";

// TODO
// This can be more efficient
export function DBML2JSON(dbml: string): DBML {
    const tablesIN = dbml.match(/(Table)[^]+?({)[^]+?(})/g);
    let tables: Table[] = [];

    tablesIN?.forEach((item, index) => {
        const columnsIN = item.match(/(?<={\r\n)[^]+?(?=})/g)?.toString().replace(/ {4}/g,' ').split('\r\n') as string[];
        const columnsFiltered = columnsIN.filter(item => {
            return item !== "";
        });
        const columns = [] as Column[];

        columnsFiltered.forEach((column, index) => {
            var rawData = column.substring(1);
            var options = column.match(/(?<=\[).+?(?=\])/g)?.toString().split(',') as string[];
            if (options === undefined) {
                options = [] as string[];
            }
            var data = rawData.split(' ') as string[];
            if (data[0] !== "Note:") {
                var columnOut: Column = {
                    Name: data[0],
                    Type: data[1],
                    Options: options.filter(x => !x.includes("Note:") && !x.includes("default: ")),
                    Default: options.find(x => x.includes("default:"))?.toString() as string,
                    Note: options.find(x => x.includes("Note:"))?.toString().match(/(?<=').*\w/g)?.toString() as string,
                };
                columns.push(columnOut);
            }
        });

        var tableNote = item.match(/(?<=Note: ').*\w/g) as string[];
        
        var table: Table = {
            Name: item.match(/(?<=Table ).*\w/g)?.toString() as string,
            Columns: columns,
            Note: tableNote[tableNote?.length - 1] as string,
        };

        tables.push(table);
    });

    const json: DBML = {
        Project: dbml.match(/(?<=Project ).*\w/g)?.toString() as string,
        database_type: dbml.match(/(?<=database_type: ').*\w/g)?.toString() as string,
        Note: dbml.match(/(?<=Note: ''')[^]+(?=''')/gm)?.toString().replace(/ {4}/g,' ') as string,
        Tables: tables,
    } as DBML;

    return json;
}