import createStyles from "@material-ui/core/styles/createStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Table as MaterialTable } from "@material-ui/core";
import { Theme, WithStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import { Column, Reference } from "../Lib/Declarations";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Chip from "@material-ui/core/Chip";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import CallSplitIcon from '@material-ui/icons/CallSplit';
import HeightIcon from '@material-ui/icons/Height';

const styles = (theme: Theme) => createStyles({
    Note: {
        padding: "20px"
    },
    Chip: {
        marginRight: "5px"
    },
    GreaterThan: {
        transform: "rotate(270deg)"
    },
    LessThan: {
        transform: "rotate(90deg)"
    },
    OneToOne: {
        transform: "rotate(90deg)"
    }
});

interface ITableProps extends WithStyles<typeof styles> {
    Name: string;
    Alias: string;
    Columns: Column[];
    Note: string;
    References: Reference[];
}

interface ITableState {
    Page: number;
    RowsPerPage: number;
}

class Table extends React.Component<ITableProps, ITableState> {
    static displayName = Table.name;

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
                        {this.props.Alias === undefined &&
                            <Typography variant="h2">
                                {this.props.Name}
                            </Typography>
                        }
                        {this.props.Alias !== undefined &&
                            <>
                                <Typography variant="h2">
                                    {this.props.Alias}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Table Name: {this.props.Name}
                                </Typography>
                            </>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Note:
                        </Typography>
                        <Paper variant="outlined" className={classes.Note}>
                            <Typography>
                                {this.props.Note}
                            </Typography>
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
                                    {this.props.Columns.length !== 0 &&
                                        this.props.Columns.slice(this.state.Page * this.state.RowsPerPage, this.state.Page * this.state.RowsPerPage + this.state.RowsPerPage).map((column, index) => {
                                             return (
                                                <TableRow>
                                                    <TableCell align="center">{column.Name}</TableCell>
                                                    <TableCell align="center">{column.Type}</TableCell>
                                                    <TableCell align="center">
                                                        {column.Options.map(option => {
                                                            if (option === "primary key") {
                                                                return (
                                                                    <Chip className={classes.Chip} color="secondary" icon={<VpnKeyIcon />} label="PK" size="small" />
                                                                );
                                                            } else {
                                                                return (
                                                                    <Chip className={classes.Chip} label={option} size="small" />
                                                                )
                                                            }
                                                        })}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Grid container direction="row" justify="center">
                                                           {this.props.References.map(ref => {
                                                                if (ref.Type === "-") {
                                                                    return (
                                                                        <Grid container xs={12}>
                                                                            <Grid item xs={2}>
                                                                                <HeightIcon className={classes.OneToOne} />
                                                                            </Grid>
                                                                            <Grid item xs={8}>
                                                                                <Typography>{`${ref.Secondary.Table}.${ref.Secondary.Column}`}</Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    );
                                                                } else if (ref.Primary.Table === this.props.Name && ref.Primary.Column === column.Name) {
                                                                    return (
                                                                        <Grid container xs={12}>
                                                                            <Grid item xs={2}>
                                                                                <CallSplitIcon className={classes.GreaterThan} />
                                                                            </Grid>
                                                                            <Grid item xs={8}>
                                                                                <Typography>{`${ref.Secondary.Table}.${ref.Secondary.Column}`}</Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    );
                                                                } else if (ref.Secondary.Table === this.props.Name && ref.Secondary.Column === column.Name) {
                                                                    return (
                                                                        <Grid container xs={12}>
                                                                            <Grid item xs={2}>
                                                                                <CallSplitIcon className={classes.LessThan} />
                                                                            </Grid>
                                                                            <Grid item xs={8}>
                                                                                <Typography>{`${ref.Primary.Table}.${ref.Primary.Column}`}</Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    )
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
                                    {this.props.Columns.length === 0 &&
                                        <TableRow>
                                            <TableCell align="center" colSpan={6}>No Columns Found</TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            colSpan={6}
                                            rowsPerPageOptions={[5, 10, 25]}
                                            count={this.props.Columns.length}
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

export default withStyles(styles)(Table);