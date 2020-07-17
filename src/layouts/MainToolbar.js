import React from "react";
import {
    AppBar,
    Button,
    Toolbar,
    makeStyles,
    IconButton,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import AddDialog from "./AddDialog";

import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    logoButton: {
        height: 64,
        width: 180,
        borderRadius: 0,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        color: theme.palette.primary,
        background: "white",
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {},
    hide: {
        display: "none",
    },
    buttons: {
        marginLeft: "auto",
    },
    addButton: {
        paddingLeft: 16,
        paddingRight: 16,
    },
}));

function MainToolbar(props) {
    const { toggleDrawer, drawerOpen } = props;
    const classes = useStyles();
    const [addDialogAnchor, setAddDialogAnchor] = React.useState(null);

    const handleOpenAddDialog = (event) =>
        setAddDialogAnchor(event.currentTarget);
    const handleCloseAddDialog = () => setAddDialogAnchor(null);

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: drawerOpen,
            })}
        >
            <Toolbar className={classes.toolbar}>
                <IconButton
                    onClick={toggleDrawer}
                    edge="start"
                    className={{ [classes.hide]: drawerOpen }}
                >
                    <MenuIcon />
                </IconButton>

                <Button className={classes.logoButton}>
                    <img
                        src="assets/images/hubble.png"
                        alt="Hubble logo"
                        height="40px"
                    />
                </Button>
                <div className={classes.buttons}>
                    <Button
                        className={classes.addButton}
                        variant="text"
                        size="small"
                        color="primary"
                        onClick={handleOpenAddDialog}
                    >
                        <AddIcon />
                        Quick Add
                    </Button>
                </div>

                <AddDialog
                    open={Boolean(addDialogAnchor)}
                    onClose={handleCloseAddDialog}
                    anchor={addDialogAnchor}
                />
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(MainToolbar);
