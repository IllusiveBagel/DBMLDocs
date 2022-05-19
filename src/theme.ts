import { grey, indigo, pink } from "@mui/material/colors";
import { ThemeOptions } from "@mui/material";


export const lightTheme: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: indigo[500],
        },
        secondary: {
            main: pink[500]
        },
        background: {
            default: grey[100]
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    borderColor: '#fff',
                    ":hover": {
                        borderColor: '#fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.08);'
                    }
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: indigo[500]
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#fff'
                }
            }
        }
    }
};

export const darkTheme: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: indigo[500]
        },
        secondary: {
            main: pink[500]
        },
        background: {
            default: '#303030',
            paper: '#424242',
        },
    },
    components: {
         MuiButton: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    borderColor: '#fff',
                    ":hover": {
                        borderColor: '#fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.08);'
                    }
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: indigo[500]
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#fff'
                }
            }
        }
    }
};