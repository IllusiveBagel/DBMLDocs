import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CodeIcon from "@material-ui/icons/Code";
import createStyles from "@material-ui/core/styles/createStyles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import StorageIcon from "@material-ui/icons/Storage";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import withStyles from "@material-ui/core/styles/withStyles";
import { DBML } from "../Lib/Declarations";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Link as MaterialLink } from "@material-ui/core";
import { Theme, WithStyles } from "@material-ui/core/styles";

const drawerWidth = 220;

const styles = (theme: Theme) => createStyles({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    search: {
        margin: "16px 8px 8px"
    },
    title: {
        textDecoration: "none",
        color: "inherit"
    },
    menuIcon: {
        marginRight: "5px",
    }
});

interface INavigationProps extends WithStyles<typeof styles>, RouteComponentProps {
    Database: DBML;
}

interface INavigationState {
    Search: string;
    ExportMenu: boolean;
    ExportMenuEl: any;
}

class Navigation extends React.Component<INavigationProps, INavigationState> {
    static displayName = Navigation.name;

    constructor(props: any) {
        super(props);
        this.state={
            Search: "",
            ExportMenu: false,
            ExportMenuEl: null,
        };
    }

    render() {
        const classes = this.props.classes;

        function ListItemLink(props: any) {
            const { icon, primary, to } = props;
          
            const CustomLink = (props: any) => <Link to={to} {...props} />;
          
            return (
              <li>
                <ListItem button component={CustomLink}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={primary} />
                </ListItem>
              </li>
            );
        }

        return (
            <>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                            <Typography variant="h6" noWrap component={Link} to="/" className={classes.title}>
                                <IconButton>
                                    <StorageIcon />
                                </IconButton>
                                {this.props.Database.Project}
                            </Typography>
                        <Button
                            variant="outlined"
                            endIcon={<ExpandMoreIcon />}
                            onClick={(event) => {
                                this.setState({
                                    ExportMenu: true,
                                    ExportMenuEl: event.target
                                })
                            }}
                        >
                            Export
                        </Button>
                        <Menu
                            open={this.state.ExportMenu}
                            anchorEl={this.state.ExportMenuEl}
                            keepMounted
                            onClose={() => {
                                this.setState({
                                    ExportMenu: false,
                                    ExportMenuEl: null
                                })
                            }}
                        >
                            <MenuItem
                                
                            >
                                <StorageIcon className={classes.menuIcon} />
                                <MaterialLink
                                    href={`/Database/${this.props.Database.Project}.dbml`}
                                    download={`${this.props.Database.Project}.dbml`}
                                    underline="none"
                                    color="inherit"
                                >
                                    DBML
                                </MaterialLink>
                                
                            </MenuItem>
                            <MenuItem>
                                <CodeIcon className={classes.menuIcon} />
                                <MaterialLink
                                    href={`data:text/json;charset=utf-8,${encodeURIComponent(
                                        JSON.stringify(this.props.Database, null, "\t")
                                    )}`}
                                    download={`${this.props.Database.Project}.json`}
                                    underline="none"
                                    color="inherit"
                                >
                                    JSON
                                </MaterialLink>
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    anchor="left"
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <FormControl variant="outlined" size="small" className={classes.search}>
                        <InputLabel id="search-input-label">Search</InputLabel>
                        <OutlinedInput
                            id="search-input"
                            label="Search"
                            onChange={(event) => this.setState({
                                Search: event.target.value
                            })}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <List component="nav" dense>
                        {this.props.Database.Tables.filter(x => x.Name.toLowerCase().includes(this.state.Search.toLowerCase())).map((table, index) => {
                            return (
                                <ListItemLink
                                    to={"/" + table.Name}
                                    primary={table.Name}
                                    icon={<WebAssetIcon />}
                                    key={index}
                                />
                            );
                        })}
                    </List>
                </Drawer>
            </>
        );
    }
}

export default withRouter(withStyles(styles)(Navigation));