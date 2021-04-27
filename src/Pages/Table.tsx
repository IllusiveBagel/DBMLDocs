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
import { Column } from "../Lib/Declarations";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Chip from "@material-ui/core/Chip";

const styles = (theme: Theme) => createStyles({
    Note: {
        padding: "20px"
    },
    Chip: {
        marginRight: "5px"
    }
});

interface ITableProps extends WithStyles<typeof styles> {
    Name: string;
    Columns: Column[];
    Note: string;
}

interface ITableState {

}

class Table extends React.Component<ITableProps, ITableState> {
    static displayName = Table.name;

    constructor(props: any){
        super(props);
        this.state={};
    }

    render() {
        const classes = this.props.classes;
        
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h2">
                            {this.props.Name}
                        </Typography>
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
                                        <TableCell align="center">Column</TableCell>
                                        <TableCell align="center">Type</TableCell>
                                        <TableCell align="center">Settings</TableCell>
                                        <TableCell align="center">References</TableCell>
                                        <TableCell align="center">Default Value</TableCell>
                                        <TableCell align="center">Note</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.Columns.map(column => {
                                        return(
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
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center">{column.Default}</TableCell>
                                                <TableCell align="center">{column.Note}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </MaterialTable>
                        </TableContainer>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default withStyles(styles)(Table);