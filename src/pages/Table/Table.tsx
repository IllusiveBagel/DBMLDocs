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
    Name: string;
    Alias: string;
    Columns: Column[];
    Note: string;
    References: Reference[];
}

const Table = (props: ITableProps) => {
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
                    {props.Alias === undefined &&
                        <Typography variant="h2">
                            {props.Name}
                        </Typography>
                    }
                    {props.Alias !== undefined &&
                        <>
                            <Typography variant="h2">
                                {props.Alias}
                            </Typography>
                            <Typography variant="subtitle1">
                                Table Name: {props.Name}
                            </Typography>
                        </>
                    }
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
                                    <TableCell align="center" width="16.6%">Column</TableCell>
                                    <TableCell align="center" width="16.6%">Type</TableCell>
                                    <TableCell align="center" width="16.6%">Settings</TableCell>
                                    <TableCell align="center" width="16.6%">References</TableCell>
                                    <TableCell align="center" width="16.6%">Default Value</TableCell>
                                    <TableCell align="center" width="16.6%">Note</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.Columns.length !== 0 &&
                                    props.Columns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((column, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell align="center">{column.Name}</TableCell>
                                                <TableCell align="center">{column.Type}</TableCell>
                                                <TableCell align="center">
                                                    {column.Options.map((option, index) => {
                                                        if (option === "primary key") {
                                                            return (
                                                                <Chip className={styles.Chip} color="secondary" icon={<VpnKeyIcon />} label="PK" size="small" key={index} />
                                                            );
                                                        } else {
                                                            return (
                                                                <Chip className={styles.Chip} label={option} size="small" key={index} />
                                                            );
                                                        }
                                                    })}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Grid container direction="row">
                                                        {props.References.map((ref, index) => {
                                                            if (ref.Type === "-") {
                                                                return (
                                                                    <Grid container key={index}>
                                                                        <Grid item xs={2}>
                                                                            <HeightIcon className={styles.OneToOne} />
                                                                        </Grid>
                                                                        <Grid item xs={8}>
                                                                            <Typography>{`${ref.Secondary.Table}.${ref.Secondary.Column}`}</Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                );
                                                            } else if (ref.Primary.Table === props.Name && ref.Primary.Column === column.Name) {
                                                                return (
                                                                    <Grid container key={index}>
                                                                        <Grid item xs={2}>
                                                                            <CallSplitIcon className={styles.GreaterThan} />
                                                                        </Grid>
                                                                        <Grid item xs={8}>
                                                                            <Typography>{`${ref.Secondary.Table}.${ref.Secondary.Column}`}</Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                );
                                                            } else if (ref.Secondary.Table === props.Name && ref.Secondary.Column === column.Name) {
                                                                return (
                                                                    <Grid container key={index}>
                                                                        <Grid item xs={2}>
                                                                            <CallSplitIcon className={styles.LessThan} />
                                                                        </Grid>
                                                                        <Grid item xs={8}>
                                                                            <Typography>{`${ref.Primary.Table}.${ref.Primary.Column}`}</Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                );
                                                            } else {
                                                                return null;
                                                            }
                                                        })}
                                                    </Grid>

                                                </TableCell>
                                                <TableCell align="center">{column.Default}</TableCell>
                                                <TableCell align="center">{column.Note}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {props.Columns.length === 0 &&
                                    <TableRow>
                                        <TableCell align="center" colSpan={6}>No Columns Found</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        count={props.Columns.length}
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

export default Table;