import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import createStyes from "@material-ui/core/styles/createStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navigation from "./Navigation";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { DBML } from "../Lib/Declarations";
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

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
    },
});

interface ILayoutProps extends WithStyles<typeof styles> {
    Database: DBML;
}

interface ILayoutState {
    darkTheme: boolean;
}

class Layout extends React.Component<ILayoutProps, ILayoutState> {
    static displayName = Layout.name;

    constructor(props: any) {
        super(props);
        this.state={
            darkTheme: true,
        };
    }

    public setTheme() {
        if (this.state.darkTheme) {
            this.setState({
                darkTheme: false
            });
        } else {
            this.setState({
                darkTheme: true
            });
        }
    }

    render() {
        const classes = this.props.classes;

        return (
            <ThemeProvider theme={this.state.darkTheme ? darkTheme : lightTheme}>
                <div className={classes.root}>
                    <CssBaseline />
                    <Navigation Database={this.props.Database} theme={this.state.darkTheme} setTheme={this.setTheme.bind(this)} />
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