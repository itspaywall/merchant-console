import React from 'react';
import { AppBar, Hidden, Button, Toolbar, makeStyles, Icon, useTheme, IconButton } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    logoButton: {
        height: 64,
        width: 180,
        borderRadius: 0
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        color: theme.palette.primary,
        background: 'white',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    menuButton: {
        marginRight: 36
    },
}));

function MainToolbar(props) {
    const theme = useTheme();
    const { toggleDrawer, drawerOpen } = props;
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={ clsx(classes.appBar, { [classes.appBarShift]: drawerOpen }) }>
            <Toolbar>
                <IconButton
                    onClick={ toggleDrawer }
                    edge="start"
                    className={ clsx(classes.menuButton, { [ classes.hide ]: drawerOpen }) }>
                    <Icon>menu</Icon>
                </IconButton>
                <Hidden mdDown={ true }>
                    <Button className={ classes.logoButton }>
                        <img src="assets/images/hubble.png" alt="Hubble logo" height="40px" />
                    </Button>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(MainToolbar);
