import createStyles from "@material-ui/core/styles/createStyles";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Theme, WithStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({

});

interface ITableProps extends WithStyles<typeof styles> {

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
        return (
            <div></div>
        );
    }
}

export default withStyles(styles)(Table);