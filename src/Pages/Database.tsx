import createStyles from "@material-ui/core/styles/createStyles";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Theme, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme: Theme) => createStyles({

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
        return (
            <>
                <Typography variant="h2">
                    {this.props.Project}
                </Typography>
                <Typography>
                    Database Type: {this.props.DBType}
                </Typography>
            </>
        );
    }
}

export default withStyles(styles)(Database);