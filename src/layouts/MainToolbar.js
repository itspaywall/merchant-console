/*
 * Copyright 2017-2020 Samuel Rowe, Joel E. Rego
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import { connect } from "react-redux";

import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import LogoutIcon from "@material-ui/icons/ExitToApp";

import AddDialog from "./AddDialog";
import * as actions from "../redux/actions";

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
    logoutButton: {
        marginLeft: 8,
        paddingLeft: 16,
        paddingRight: 16,
    },
    icon: {
        dispay: "inline-block",
        marginRight: 4,
    },
}));

function MainToolbar(props) {
    const { toggleDrawer, drawerOpen, user, logout } = props;
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
                        <AddIcon className={classes.icon} />
                        Quick Add
                    </Button>

                    <Button
                        className={classes.logoutButton}
                        variant="text"
                        size="small"
                        color="secondary"
                        onClick={logout}
                    >
                        <LogoutIcon className={classes.icon} />
                        Logout {user.firstName}
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

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

const mapDispatchToProps = {
    fetchUser: actions.fetchUser,
    logout: actions.logout,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MainToolbar));
