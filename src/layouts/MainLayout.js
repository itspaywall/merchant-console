import React from 'react';
import { renderRoutes } from 'react-router-config'
import MainToolbar from './MainToolbar';

// TODO: The layouts should be configurable.
// TODO: Show drawer instead of toolbar for smaller screens.
function MainLayout(props) {
    const { classes } = props; 
    return (
        <React.Fragment>
            <div className={ classes.root }>
                <MainToolbar />
                
                { /* renderRoutes(routes) */ }
                { props.children }

                { /* <MainFooter /> */ }
            </div>
        </React.Fragment>
    );
}

export default MainLayout;