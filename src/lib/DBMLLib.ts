import { Column, ConnectionType, DBML, Reference, Table } from "./Declarations";

// TODO
// This can be more efficient
export function DBML2JSON(dbml: string): DBML {
    const projectIN = dbml.match(/(Project)[^]+?({)[^]+?(})/g)?.toString() as string;
    const tablesIN = dbml.match(/(Table)[^]+?({)[^]+?(})/g);
    let tables: Table[] = Tables(tablesIN);

    var refsIn = dbml.match(/(?<=Ref .*: ).*\w/g) as string[];
    var refNames = dbml.match(/(?<=Ref ).+?(?=:)/g) as string[];
    const refs: Reference[] = References(refsIn, refNames);

    var note = projectIN?.match(/(?<=Note: ''')[^]+(?=''')/gm)?.toString().replace(/ {4}/g,' ') as string;

    if (note == null) {
        note = projectIN?.match(/(?<=Note: ').*\w/g)?.toString() as string
    }

    const json: DBML = {
        project: dbml.match(/(?<=Project ).*\w/g)?.toString() as string,
        databaseType: dbml.match(/(?<=database_type: ').*\w/g)?.toString() as string,
        note: note,
        tables: tables,
        references: refs,
    } as DBML;

    return json;
}

function Tables(tablesIN: any): Table[] {
    let tables: Table[] = [];

    tablesIN?.forEach((item: string) => {
        const columnsIN = item.match(/(?<={\n)[^]+?(?=})/g)?.toString().replace(/ {2,}/g,' ').split('\n') as string[];
        const columnsFiltered = columnsIN.filter(item => {
            return item !== "";
        });
        const columns = Columns(columnsFiltered);

        var note = item.match(/(?<=Note: ''')[^]+(?=''')/gm)?.toString().replace(/ {4}/g,' ') as string;

        if (note === null || note === "" || note === undefined) {
            var noteArray = item.match(/(?<=Note: ').*\w/g) as string[];
            note = noteArray[noteArray.length - 1] as string;
        }
        
        var table: Table = {
            name: item.match(/(?<=Table )[^]+?(?= )/g)?.toString().split(',')[0] as string,
            alias: item.match(/(?<=as )[^]+?(?= {)/g)?.toString() as string,
            columns: columns,
            note: note,
        };

        tables.push(table);
    });

    return tables;
}

function Columns(columnsFiltered: any): Column[] {
    const columns = [] as Column[];

    columnsFiltered.forEach((column: string) => {
        var rawData = column.substring(1);
        var options = column.match(/(?<=\[).+?(?=\])/g)?.toString().split(',') as string[];
        if (options === undefined) {
            options = [] as string[];
        }
        var data = rawData.split(' ') as string[];
        if (data[0] !== "Note:") {
            var columnOut: Column = {
                name: data[0],
                type: data[1],
                options: options.filter(x => !x.toLowerCase().includes("note:") && !x.includes("default: ")),
                default: options.find(x => x.includes("default:"))?.toString() as string,
                note: options.find(x => x.toLowerCase().includes("note:"))?.toString().match(/(?<=').*\w/g)?.toString() as string,
            };
            columns.push(columnOut);
        }
    });

    return columns;
}

function References(refsIn: any, refNames: any): Reference[] {
    let refs: Reference[] = [];

    refsIn.forEach((refIn: string, index: number) => {
        var refArray = refIn.split(' ');
        var ref: Reference = {
            name: refNames[index],
            primary: {
                table: refArray[0].split('.')[0],
                column: refArray[0].split('.')[1]
            },
            type: refArray[1].toString() as ConnectionType,
            secondary: {
                table: refArray[2].split('.')[0],
                column: refArray[2].split('.')[1]
            },
        }
        refs.push(ref);
    });

    return refs;
}