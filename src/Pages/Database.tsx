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
import { Table } from "../Lib/Declarations";
import { Link } from "react-router-dom";
import { Link as MaterialLink } from "@material-ui/core";

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
}

interface IDatabaseState {

}

class Database extends React.Component<IDatabaseProps, IDatabaseState> {
    static displayName = Database.name;

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
                            {this.props.Project}
                        </Typography>
                        <Chip color="secondary" icon={<StorageIcon />} label={this.props.DBType} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Note:
                        </Typography>
                        <Paper className={classes.Note}>
                            <ReactMarkdown remarkPlugins={[gfm]} children={this.props.Note} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <MaterialTable>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" width="33%">Table</TableCell>
                                        <TableCell align="center" width="33%">Columns</TableCell>
                                        <TableCell align="center" width="33%">Note</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.Tables.map(table => {
                                        return(
                                            <TableRow>
                                                <TableCell align="center">
                                                    <Link to={"/" + table.Name} component={MaterialLink} color="inherit">{table.Name}</Link>
                                                </TableCell>
                                                <TableCell align="center">{table.Columns.length}</TableCell>
                                                <TableCell align="center">{table.Note}</TableCell>
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

export default withStyles(styles)(Database);