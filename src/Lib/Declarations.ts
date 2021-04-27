export interface DBML {
    Project: string;
    database_type: string;
    Note: string;
    Tables: Table[];
    References: Reference[];
}

export interface Table {
    Name: string;
    Columns: Column[];
    Note: string;
}

export interface Column {
    Name: string;
    Type: string;
    Options: string[];
    Default: string;
    Note: string;
}

export interface Reference {
    Name: string;
    Type: ConnectionType;
    Primary: ReferenceConnection;
    Secondary: ReferenceConnection;
}

export interface ReferenceConnection {
    Table: string;
    Column: string;
}

export type ConnectionType = ">" | "<" | "-";