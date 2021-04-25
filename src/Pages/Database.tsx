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

const styles = (theme: Theme) => createStyles({
    Note: {
        padding: "20px",
    }
});

interface IDatabaseProps extends WithStyles<typeof styles> {
    Project: string;
    DBType: string;
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
                </Grid>
                
            </>
        );
    }
}

export default withStyles(styles)(Database);