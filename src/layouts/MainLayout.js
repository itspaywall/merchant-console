import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { renderRoutes } from 'react-router-config'
import MainToolbar from './MainToolbar';
import routes from '../routes';

const styles = theme => ({
});

// TODO: The layouts should be configurable.
// TODO: Show drawer instead of toolbar for smaller screens.
function MainLayout(props) {
    const { classes } = props; 
    return (
        <React.Fragment>
            <div className={ classes.root }>
                <MainToolbar />
                
                <div>
                    { renderRoutes(routes) }
                    { props.children }
                </div>

                { /* <MainFooter /> */ }
            </div>
        </React.Fragment>
    );
}

export default withStyles(styles)(MainLayout);