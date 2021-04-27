import { Column, ConnectionType, DBML, Reference, Table } from "./Declarations";

// TODO
// This can be more efficient
export function DBML2JSON(dbml: string): DBML {
    const tablesIN = dbml.match(/(Table)[^]+?({)[^]+?(})/g);
    let tables: Table[] = [];

    tablesIN?.forEach(item => {
        const columnsIN = item.match(/(?<={\r\n)[^]+?(?=})/g)?.toString().replace(/ {4}/g,' ').split('\r\n') as string[];
        const columnsFiltered = columnsIN.filter(item => {
            return item !== "";
        });
        const columns = [] as Column[];

        columnsFiltered.forEach(column => {
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

    let refs: Reference[] = [];
    var refsIn = dbml.match(/(?<=Ref .*: ).*\w/g) as string[];
    var refNames = dbml.match(/(?<=Ref ).+?(?=:)/g) as string[];

    refsIn.forEach((refIn, index) => {
        var refArray = refIn.split(' ');
        var ref: Reference = {
            Name: refNames[index],
            Primary: {
                Table: refArray[0].split('.')[0],
                Column: refArray[0].split('.')[1]
            },
            Type: refArray[1].toString() as ConnectionType,
            Secondary: {
                Table: refArray[2].split('.')[0],
                Column: refArray[2].split('.')[1]
            },
        }
        refs.push(ref);
    })

    const json: DBML = {
        Project: dbml.match(/(?<=Project ).*\w/g)?.toString() as string,
        database_type: dbml.match(/(?<=database_type: ').*\w/g)?.toString() as string,
        Note: dbml.match(/(?<=Note: ''')[^]+(?=''')/gm)?.toString().replace(/ {4}/g,' ') as string,
        Tables: tables,
        References: refs,
    } as DBML;

    return json;
}