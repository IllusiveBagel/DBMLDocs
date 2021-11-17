import Chip from "@material-ui/core/Chip";
import createStyles from "@material-ui/core/styles/createStyles";
import gfm from "remark-gfm";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import ReactMarkdown from "react-markdown";
import StorageIcon from "@material-ui/icons/Storage";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Theme, WithStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import { Table as MaterialTable } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Reference, Table } from "../Lib/Declarations";
import { Link } from "react-router-dom";
import { Link as MaterialLink } from "@material-ui/core";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

type GetReferences = (tableName: string, References: Reference[]) => Reference[];

const styles = (theme: Theme) => createStyles({
    Note: {
        padding: "5px 20px 20px 20px",
    }
});

interface IDatabaseProps extends WithStyles<typeof styles> {
    Project: string;
    DBType: string;
    Tables: Table[];
    Note: string;
    References: Reference[];
    GetReferences: GetReferences;
}

interface IDatabaseState {
    Page: number;
    RowsPerPage: number;
}

class Database extends React.Component<IDatabaseProps, IDatabaseState> {
    static displayName = Database.name;

    constructor(props: any){
        super(props);
        this.state={
            Page: 0,
            RowsPerPage: 5,
        };

        this.HandleChangePage = this.HandleChangePage.bind(this);
        this.HandleChangeRowsPerPage = this.HandleChangeRowsPerPage.bind(this);
    }

    private HandleChangePage(event: unknown, newPage: number) {
        this.setState({
            Page: newPage,
        });
    }

    private HandleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            Page: 0,
            RowsPerPage: parseInt(event.target.value, 10),
        });
    }

    render() {
        const classes = this.props.classes;
        
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h2">
                            {this.props.Project}
                        </Typography>
                        <Chip color="secondary" icon={<StorageIcon />} label={this.props.DBType} />
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.Note}>
                            <ReactMarkdown remarkPlugins={[gfm]} children={this.props.Note} />
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
                                    {this.props.Tables.length !== 0 &&
                                        this.props.Tables.slice(this.state.Page * this.state.RowsPerPage, this.state.Page * this.state.RowsPerPage + this.state.RowsPerPage).map((table, index) => {
                                             return (
                                                <TableRow key={index}>
                                                    <TableCell align="center">
                                                        <Link to={"/" + table.Name} component={MaterialLink} color="inherit">{table.Name}</Link>
                                                    </TableCell>
                                                    <TableCell align="center">{table.Columns.length}</TableCell>
                                                    <TableCell align="center">
                                                        {this.props.GetReferences(table.Name, this.props.References).length}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                    })}
                                    {this.props.Tables.length === 0 &&
                                        <TableRow>
                                            <TableCell align="center" colSpan={4}>No Tables Found</TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            colSpan={4}
                                            rowsPerPageOptions={[5, 10, 25]}
                                            count={this.props.Tables.length}
                                            rowsPerPage={this.state.RowsPerPage}
                                            page={this.state.Page}
                                            onChangePage={this.HandleChangePage}
                                            onChangeRowsPerPage={this.HandleChangeRowsPerPage}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </MaterialTable>
                        </TableContainer>
                    </Grid>
                </Grid>
                
            </>
        );
    }
}

export default withStyles(styles)(Database);