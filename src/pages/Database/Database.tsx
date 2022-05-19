import Chip from "@mui/material/Chip";
import gfm from "remark-gfm";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import StorageIcon from "@mui/icons-material/Storage";
import styles from "./Database.module.css";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { getReferences } from "../Declarations";
import { Link } from "react-router-dom";
import { Link as MaterialLink, Table as MaterialTable } from "@mui/material";
import { Reference, Table } from "../../lib/Declarations";

interface IDatabaseProps {
    project: string;
    dbType: string;
    tables: Table[];
    note: string;
    references: Reference[];
    getReferences: getReferences;
}

const Database = ({ project, dbType, tables, note, references, getReferences }: IDatabaseProps) => {
    const [page, setPage] = useState<number>(0 as number);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5 as number);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h2">
                        {project}
                    </Typography>
                    <Chip color="secondary" icon={<StorageIcon />} label={dbType} />
                </Grid>
                <Grid item xs={12}>
                    <Paper className={styles.note}>
                        <ReactMarkdown remarkPlugins={[gfm]} children={note} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <MaterialTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" width="25%">Table</TableCell>
                                    <TableCell align="center" width="25%">Columns</TableCell>
                                    <TableCell align="center" width="25%">References</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tables.length !== 0 &&
                                    tables.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((table, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell align="center">
                                                    <MaterialLink component={Link} to={"/" + table.name} color="inherit">{table.name}</MaterialLink>
                                                </TableCell>
                                                <TableCell align="center">{table.columns.length}</TableCell>
                                                <TableCell align="center">
                                                    {getReferences(table.name, references).length}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {tables.length === 0 &&
                                    <TableRow>
                                        <TableCell align="center" colSpan={4}>No Tables Found</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        count={tables.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </MaterialTable>
                    </TableContainer>
                </Grid>
            </Grid>

        </>
    );
};

export default Database;