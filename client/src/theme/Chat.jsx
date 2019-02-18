const style = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        width: '100%',
        maxWidth: 360,
        height : '80px',
        backgroundColor: theme.palette.background.paper,
    },
    tile : {
        height : '80px',
    },
    gridList: {
        width: 225,
        height: 300,
        transform: 'translateZ(0)',
    },
    icon: {
        color: 'white',
    },
    inline: {
        display: 'inline',
    }
})


export default style
