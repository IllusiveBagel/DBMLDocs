import CssBaseline from "@mui/material/CssBaseline";
import Navigation from "../Navigation/Navigation";
import React, { useState } from "react";
import styles from "./Layout.module.css";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DBML } from "../../lib/Declarations";

interface ILayoutProps {
    database: DBML;
    children: React.ReactNode;
}

const Layout = ({ database, children }: ILayoutProps) => {
    const [darkMode, setDarkMode] = useState<boolean>(useMediaQuery('(prefers-color-scheme: dark)'));

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? 'dark' : 'light',
                },
            }),
        [darkMode],
    );

    const setTheme = () => {
        if (darkMode) {
            setDarkMode(false);
        } else {
            setDarkMode(true);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.root}>
                <CssBaseline />
                <Navigation database={database} theme={darkMode} setTheme={setTheme} />
                <main className={styles.content}>
                    <Toolbar />
                    {children}
                </main>
            </div>
        </ThemeProvider>
    );
};

export default Layout;