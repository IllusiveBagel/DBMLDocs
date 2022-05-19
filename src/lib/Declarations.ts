export interface DBML {
    project: string;
    databaseType: string;
    note: string;
    tables: Table[];
    enums: Enum[];
    references: Reference[];
}

export interface Table {
    name: string;
    alias: string;
    columns: Column[];
    note: string;
}

export interface Column {
    name: string;
    type: string;
    options: string[];
    default: string;
    note: string;
}

export interface Enum {
    name: string;
    items: string[];
}

export interface Reference {
    name: string;
    type: ConnectionType;
    primary: ReferenceConnection;
    secondary: ReferenceConnection;
}

export interface ReferenceConnection {
    table: string;
    column: string;
}

export type ConnectionType = ">" | "<" | "-";
