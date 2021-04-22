import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import createStyes from "@material-ui/core/styles/createStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navigation from "./Navigation";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Theme, ThemeProvider, WithStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyes({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

interface ILayoutProps extends WithStyles<typeof styles> {

}

interface ILayoutState {

}

class Layout extends React.Component<ILayoutProps, ILayoutState> {
    static displayName = Layout.name;

    constructor(props: any) {
        super(props);
        this.state={};
    }

    render() {
        const classes = this.props.classes;

        return (
            <ThemeProvider theme={darkTheme}>
                <div className={classes.root}>
                    <CssBaseline />
                    <Navigation />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {this.props.children}
                    </main>
                </div>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(Layout);