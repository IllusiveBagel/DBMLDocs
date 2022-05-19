import CallSplitIcon from "@mui/icons-material/CallSplit";
import Chip from "@mui/material/Chip";
import gfm from "remark-gfm";
import Grid from "@mui/material/Grid";
import HeightIcon from "@mui/icons-material/Height";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./Table.module.css";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Column, Reference } from "../../lib/Declarations";
import { Table as MaterialTable } from "@mui/material";

interface ITableProps {
    name: string;
    alias: string;
    columns: Column[];
    note: string;
    references: Reference[];
}

const Table = ({ name, alias, columns, note, references }: ITableProps) => {
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
                    {alias === undefined &&
                        <Typography variant="h2">
                            {name}
                        </Typography>
                    }
                    {alias !== undefined &&
                        <>
                            <Typography variant="h2">
                                {alias}
                            </Typography>
                            <Typography variant="subtitle1">
                                Table Name: {name}
                            </Typography>
                        </>
                    }
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
                                    <TableCell align="center" width="16.6%">Column</TableCell>
                                    <TableCell align="center" width="16.6%">Type</TableCell>
                                    <TableCell align="center" width="16.6%">Settings</TableCell>
                                    <TableCell align="center" width="16.6%">References</TableCell>
                                    <TableCell align="center" width="16.6%">Default Value</TableCell>
                                    <TableCell align="center" width="16.6%">Note</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {columns.length !== 0 &&
                                    columns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((column, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell align="center">{column.name}</TableCell>
                                                <TableCell align="center">{column.type}</TableCell>
                                                <TableCell align="center">
                                                    {column.options.map((option, index) => {
                                                        if (option === "primary key") {
                                                            return (
                                                                <Chip className={styles.chip} color="secondary" icon={<VpnKeyIcon />} label="PK" size="small" key={index} />
                                                            );
                                                        } else {
                                                            return (
                                                                <Chip className={styles.chip} label={option} size="small" key={index} />
                                                            );
                                                        }
                                                    })}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Grid container direction="row">
                                                        {references.map((ref, index) => {
                                                            if (ref.type === "-") {
                                                                return (
                                                                    <Grid container key={index}>
                                                                        <Grid item xs={2}>
                                                                            <HeightIcon className={styles.oneToOne} />
                                                                        </Grid>
                                                                        <Grid item xs={8}>
                                                                            <Typography>{`${ref.secondary.table}.${ref.secondary.column}`}</Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                );
                                                            } else if (ref.primary.table === name && ref.primary.column === column.name) {
                                                                return (
                                                                    <Grid container key={index}>
                                                                        <Grid item xs={2}>
                                                                            <CallSplitIcon className={styles.greaterThan} />
                                                                        </Grid>
                                                                        <Grid item xs={8}>
                                                                            <Typography>{`${ref.secondary.table}.${ref.secondary.column}`}</Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                );
                                                            } else if (ref.secondary.table === name && ref.secondary.column === column.name) {
                                                                return (
                                                                    <Grid container key={index}>
                                                                        <Grid item xs={2}>
                                                                            <CallSplitIcon className={styles.lessThan} />
                                                                        </Grid>
                                                                        <Grid item xs={8}>
                                                                            <Typography>{`${ref.primary.table}.${ref.primary.column}`}</Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                );
                                                            } else {
                                                                return null;
                                                            }
                                                        })}
                                                    </Grid>

                                                </TableCell>
                                                <TableCell align="center">{column.default}</TableCell>
                                                <TableCell align="center">{column.note}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {columns.length === 0 &&
                                    <TableRow>
                                        <TableCell align="center" colSpan={6}>No Columns Found</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        count={columns.length}
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

export default Table;