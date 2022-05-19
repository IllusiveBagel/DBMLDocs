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
import ListItemLink from "../ListItemLink/ListItemLink";
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
    database: DBML;
    theme: boolean;
    setTheme: any;
}

interface INavigationState {
    search: string;
    themeMenu: boolean;
    themeMenuEl: any;
    exportMenu: boolean;
    exportMenuEl: any;
}

const Navigation = ({ database, theme, setTheme }: INavigationProps) => {

    const [navState, setNavState] = useState<INavigationState>(
        {
            search: "",
            themeMenu: false,
            themeMenuEl: null,
            exportMenu: false,
            exportMenuEl: null,
        }
    );

    return (
        <>
            <AppBar position="fixed" className={styles.appBar} color="primary">
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
                        {database.project}
                    </Typography>
                    <ButtonGroup variant="outlined" aria-label="Simple Interaction buttons">
                        <Button variant="outlined" onClick={setTheme}>
                            {theme ? 'Theme: Dark' : 'Theme: Light'}
                        </Button>
                        <Button
                            variant="outlined"
                            endIcon={<ExpandMoreIcon />}
                            onClick={(event) => {
                                setNavState(
                                    {
                                        ...navState,
                                        exportMenu: true,
                                        exportMenuEl: event.target
                                    }
                                );
                            }}
                        >
                            Export
                        </Button>
                    </ButtonGroup>


                    <Menu
                        open={navState.exportMenu}
                        anchorEl={navState.exportMenuEl}
                        keepMounted
                        onClose={() => {
                            setNavState(
                                {
                                    ...navState,
                                    exportMenu: false,
                                    exportMenuEl: null
                                }
                            );
                        }}
                    >
                        <MenuItem>
                            <StorageIcon className={styles.menuIcon} />
                            <MaterialLink
                                href={`/Database/${database.project}.dbml`}
                                download={`${database.project}.dbml`}
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
                                    JSON.stringify(database, null, "\t")
                                )}`}
                                download={`${database.project}.json`}
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
                                    search: event.target.value
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
                    {database.tables.filter(x => x.name.toLowerCase().includes(navState.search.toLowerCase())).map((table, index) => {
                        return (
                            <ListItemLink
                                to={"/" + table.name}
                                primary={table.name}
                                icon={<WebAssetIcon />}
                                key={index}
                            />
                        );
                    })}
                    {database.enums !== undefined &&
                        <ListSubheader>Enums</ListSubheader>
                    }
                </List>
            </Drawer>
        </>
    );
};

export default Navigation;