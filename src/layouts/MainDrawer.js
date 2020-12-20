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
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountsIcon from "@material-ui/icons/AccountCircle";
import PreferencesIcon from "@material-ui/icons/Settings";
import AnalyticsIcon from "@material-ui/icons/BarChart";
import TransactionsIcon from "@material-ui/icons/MonetizationOn";
import SubscriptionsIcon from "@material-ui/icons/Autorenew";
import IvoicesIcon from "@material-ui/icons/Receipt";
import PlansIcon from "@material-ui/icons/LocalOffer";
import APIKeysIcon from "@material-ui/icons/Code";
import WebhooksIcon from "@material-ui/icons/CallReceived";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: 60,
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}));

const navigationGroups = [
    {
        id: "primary",
        items: [
            {
                id: "accounts",
                title: "Accounts",
                icon: <AccountsIcon />,
                link: "/accounts",
            },
            {
                id: "subscriptions",
                title: "Subscriptions",
                icon: <SubscriptionsIcon />,
                link: "/subscriptions",
            },
            {
                id: "invoices",
                title: "Invoices",
                icon: <IvoicesIcon />,
                link: "/invoices",
            },
            {
                id: "transactions",
                title: "Transactions",
                icon: <TransactionsIcon />,
                link: "/transactions",
            },
        ],
    },
    {
        id: "dashboard",
        items: [
            {
                id: "analytics",
                title: "Analytics",
                icon: <AnalyticsIcon />,
                link: "/analytics",
            },
        ],
    },
    {
        id: "developers",
        items: [
            {
                id: "api-keys",
                title: "API Keys",
                icon: <APIKeysIcon />,
                link: "/api-keys",
            },
            {
                id: "webhooks",
                title: "Webhooks",
                icon: <WebhooksIcon />,
                link: "/webhooks",
            },
        ],
    },
    {
        id: "configuration",
        items: [
            {
                id: "plans",
                title: "Plans",
                icon: <PlansIcon />,
                link: "/plans",
            },
            {
                id: "preferences",
                title: "Preferences",
                icon: <PreferencesIcon />,
                link: "/preferences",
            },
        ],
    },
];

function MainDrawer(props) {
    const makeLinkHandler = (url) => () => props.history.push(url);

    const classes = useStyles();
    const theme = useTheme();
    const { open, handleCloseDrawer } = props;
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleCloseDrawer}>
                    {theme.direction === "rtl" ? (
                        <ChevronRightIcon />
                    ) : (
                        <ChevronLeftIcon />
                    )}
                </IconButton>
            </div>
            <Divider />
            {navigationGroups.map((group, index) => (
                <React.Fragment key={group.id}>
                    <List>
                        {group.items.map((item, index) => (
                            <ListItem
                                button
                                key={item.id}
                                onClick={makeLinkHandler(item.link)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItem>
                        ))}
                    </List>
                    {index + 1 < navigationGroups.length && <Divider />}
                </React.Fragment>
            ))}
        </Drawer>
    );
}

export default withRouter(MainDrawer);
