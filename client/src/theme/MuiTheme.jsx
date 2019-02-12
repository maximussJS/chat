import createMuiTheme from '@material-ui/core/styles/createMuiTheme'


export default createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            light: '#ef5350',
            dark: '#7f0000',
            main: '#b71c1c',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#ffffff',
            dark: '#ccc0ae',
            main: '#fff3e0',
            contrastText: '#000000',
        },
        error: {
            light: '#ff5f52',
            main: '#c62828',
            dark: '#8e0000',
            contrastText: '#000000',
        },
    },
})
