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
import { GetReferences } from "../Declarations";
import { Link } from "react-router-dom";
import { Link as MaterialLink, Table as MaterialTable } from "@mui/material";
import { Reference, Table } from "../../lib/Declarations";

interface IDatabaseProps {
    Project: string;
    DBType: string;
    Tables: Table[];
    Note: string;
    References: Reference[];
    GetReferences: GetReferences;
}

const Database = (props: IDatabaseProps) => {
    const [page, setPage] = useState<number>(0 as number);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5 as number);

    const HandleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const HandleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h2">
                        {props.Project}
                    </Typography>
                    <Chip color="secondary" icon={<StorageIcon />} label={props.DBType} />
                </Grid>
                <Grid item xs={12}>
                    <Paper className={styles.Note}>
                        <ReactMarkdown remarkPlugins={[gfm]} children={props.Note} />
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
                                {props.Tables.length !== 0 &&
                                    props.Tables.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((table, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell align="center">
                                                    {/* <Link to={"/" + table.Name} component={MaterialLink} color="inherit">{table.Name}</Link> */}
                                                    <MaterialLink component={Link} to={"/" + table.Name} color="inherit">{table.Name}</MaterialLink>
                                                </TableCell>
                                                <TableCell align="center">{table.Columns.length}</TableCell>
                                                <TableCell align="center">
                                                    {props.GetReferences(table.Name, props.References).length}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {props.Tables.length === 0 &&
                                    <TableRow>
                                        <TableCell align="center" colSpan={4}>No Tables Found</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        count={props.Tables.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={HandleChangePage}
                                        onRowsPerPageChange={HandleChangeRowsPerPage}
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