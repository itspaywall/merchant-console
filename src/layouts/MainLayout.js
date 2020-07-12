import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { renderRoutes } from 'react-router-config'
import MainToolbar from './MainToolbar';
import MainDrawer from './MainDrawer';
import routes from '../routes';

const miniDrawerWidth = 60;
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
    },
    content: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: miniDrawerWidth,
        marginTop: 64
    },
    contentShift: {
        marginLeft: drawerWidth,
        marginTop: 64,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

// TODO: The layouts should be configurable.
// TODO: Show drawer instead of toolbar for smaller screens.
function MainLayout(props) {
    const [ drawerOpen, setDrawerOpen ] = React.useState(false);
    const classes = useStyles();

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <React.Fragment>
            <div className={ classes.root }>
                <MainDrawer open={ drawerOpen } handleCloseDrawer={ toggleDrawer } />
                <MainToolbar drawerOpen={ drawerOpen } toggleDrawer={ toggleDrawer } />
                
                <main className={ clsx(classes.content, { [classes.contentShift]: drawerOpen }) }>
                    { renderRoutes(routes) }
                    { props.children }
                </main>

                { /* <MainFooter /> */ }
            </div>
        </React.Fragment>
    );
}

export default MainLayout;