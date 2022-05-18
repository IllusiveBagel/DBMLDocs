import { Reference } from "../lib/Declarations";

export type GetReferences = (tableName: string, References: Reference[]) => Reference[];
