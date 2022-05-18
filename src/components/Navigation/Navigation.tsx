import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CodeIcon from "@mui/icons-material/Code";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import StorageIcon from "@mui/icons-material/Storage";
import styles from "./Navigation.module.css";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { DBML } from "../../lib/Declarations";
import { Link } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";

interface INavigationProps {
    Database: DBML;
    theme: boolean;
    setTheme: any;
}

interface INavigationState {
    Search: string;
    ThemeMenu: boolean;
    ThemeMenuEl: any;
    ExportMenu: boolean;
    ExportMenuEl: any;
}

const Navigation = (props: INavigationProps) => {

    const [navState, setNavState] = useState<INavigationState>(
        {
            Search: "",
            ThemeMenu: false,
            ThemeMenuEl: null,
            ExportMenu: false,
            ExportMenuEl: null,
        }
    );

    const ListItemLink = (props: any) => {
        const { icon, primary, to } = props;

        const renderLink = React.useMemo(
            () =>
                React.forwardRef((itemProps: any, ref: any) => {
                    return <Link to={to} ref={ref} {...itemProps} role={undefined} />;
                }),
            [to],
        );

        return (
            <li>
                <ListItem button component={renderLink}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={primary} />
                </ListItem>
            </li>
        );
    };

    return (
        <>
            <AppBar position="fixed" className={styles.appBar}>
                <Toolbar
                    style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography variant="h6" noWrap component={Link} to="/" className={styles.title}>
                        <IconButton>
                            <StorageIcon />
                        </IconButton>
                        {props.Database.Project}
                    </Typography>
                    <ButtonGroup variant="outlined" aria-label="Simple Interaction buttons">
                        <Button variant="outlined" onClick={props.setTheme}>
                            {props.theme ? 'Theme: Dark' : 'Theme: Light'}
                        </Button>
                        <Button
                            variant="outlined"
                            endIcon={<ExpandMoreIcon />}
                            onClick={(event) => {
                                setNavState(
                                    {
                                        ...navState,
                                        ExportMenu: true,
                                        ExportMenuEl: event.target
                                    }
                                );
                            }}
                        >
                            Export
                        </Button>
                    </ButtonGroup>


                    <Menu
                        open={navState.ExportMenu}
                        anchorEl={navState.ExportMenuEl}
                        keepMounted
                        onClose={() => {
                            setNavState(
                                {
                                    ...navState,
                                    ExportMenu: false,
                                    ExportMenuEl: null
                                }
                            );
                        }}
                    >
                        <MenuItem>
                            <StorageIcon className={styles.menuIcon} />
                            <MaterialLink
                                href={`/Database/${props.Database.Project}.dbml`}
                                download={`${props.Database.Project}.dbml`}
                                underline="none"
                                color="inherit"
                            >
                                DBML
                            </MaterialLink>
                        </MenuItem>
                        <MenuItem>
                            <CodeIcon className={styles.menuIcon} />
                            <MaterialLink
                                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                                    JSON.stringify(props.Database, null, "\t")
                                )}`}
                                download={`${props.Database.Project}.json`}
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
                className={styles.drawer}
                classes={{
                    paper: styles.drawerPaper
                }}
            >
                <div className={styles.toolbar} />
                <Toolbar />
                <Divider />
                <FormControl variant="outlined" size="small" className={styles.search}>
                    <InputLabel id="search-input-label">Search</InputLabel>
                    <OutlinedInput
                        id="search-input"
                        label="Search"
                        onChange={(event) => {
                            setNavState(
                                {
                                    ...navState,
                                    Search: event.target.value
                                }
                            );
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <List component="nav" dense>
                    <ListSubheader>Tables</ListSubheader>
                    {props.Database.Tables.filter(x => x.Name.toLowerCase().includes(navState.Search.toLowerCase())).map((table, index) => {
                        return (
                            <ListItemLink
                                to={"/" + table.Name}
                                primary={table.Name}
                                icon={<WebAssetIcon />}
                                key={index}
                            />
                        );
                    })}
                    {props.Database.Enums !== undefined &&
                        <ListSubheader>Enums</ListSubheader>
                    }
                </List>
            </Drawer>
        </>
    );
};

export default Navigation;