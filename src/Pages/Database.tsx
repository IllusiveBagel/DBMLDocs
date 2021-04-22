import createStyles from "@material-ui/core/styles/createStyles";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Theme, WithStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({

});

interface IDatabaseProps extends WithStyles<typeof styles> {

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
            <div></div>
        );
    }
}

export default withStyles(styles)(Database);