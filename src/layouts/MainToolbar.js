import React from 'react';
import { AppBar, Hidden, Button, Toolbar, withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
    logoButton: {
        height: 64,
        borderRadius: 0
    }
});

class MainToolbar extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <Hidden mdDown={ true }>
                        <Button className={ classes.logoButton }>
                            <img src="assets/images/hubble.png" alt="Hubble logo" height="40px" />
                        </Button>
                    </Hidden>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(withRouter(MainToolbar));
