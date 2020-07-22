import React, { Suspense } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

// TODO: Update this import when Material UI moves this to production.
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { renderRoutes } from "react-router-config";
import MainToolbar from "./MainToolbar";
import MainDrawer from "./MainDrawer";
import { connect } from "react-redux";

import routes from "../routes";
import AccountFormDrawer from "../workspace/account/AccountFormDrawer";
import EditAccount from "../workspace/account/EditAccount";
import SubscriptionFormDrawer from "../workspace/subscription/SubscriptionFormDrawer";
import TransactionFormDrawer from "../workspace/transaction/TransactionFormDrawer";
import PlanFormDrawer from "../workspace/plan/PlanFormDrawer";
import * as actions from "../redux/actions";

const miniDrawerWidth = 60;
const drawerWidth = 240;

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: miniDrawerWidth,
        marginTop: 64,
    },
    contentShift: {
        marginLeft: drawerWidth,
        marginTop: 64,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    progress: {
        maxWidth: 24,
        maxHeight: 24,
        color: "white",
    },
    drawer: {
        width: 50,
    },
}));

// TODO: The layouts should be configurable.
// TODO: Show drawer instead of toolbar for smaller screens.
function MainLayout(props) {
    const {
        openDialog,
        notification,
        closeNotification,
        createAccount,
        createSubscription,
        createTransaction,
        createPlan,
    } = props;
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const classes = useStyles();

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleCloseNotification = (event, reason) => {
        if (reason !== "clickaway") {
            closeNotification();
        }
    };

    const renderNotification = (notification) => {
        if (notification) {
            if (notification.category === "LOADING") {
                return (
                    <Snackbar
                        open={true}
                        autoHideDuration={6000}
                        onClose={handleCloseNotification}
                    >
                        <SnackbarContent
                            message={notification.message}
                            action={
                                <CircularProgress
                                    className={classes.progress}
                                />
                            }
                        />
                    </Snackbar>
                );
            }
            return (
                <Snackbar
                    open={true}
                    autoHideDuration={6000}
                    onClose={handleCloseNotification}
                >
                    <Alert severity="success" onClose={handleCloseNotification}>
                        {notification.message}
                    </Alert>
                </Snackbar>
            );
        }
        return null;
    };

    return (
        <React.Fragment>
            <div className={classes.root}>
                <MainDrawer
                    open={drawerOpen}
                    handleCloseDrawer={toggleDrawer}
                />
                <MainToolbar
                    drawerOpen={drawerOpen}
                    toggleDrawer={toggleDrawer}
                />

                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: drawerOpen,
                    })}
                >
                    <Suspense fallback={<div>Loading...</div>}>
                        {renderRoutes(routes)}
                    </Suspense>
                    {props.children}
                </main>

                {/* <MainFooter /> */}
            </div>

            {openDialog === "EDIT_ACCOUNT" && <EditAccount />}

            <AccountFormDrawer
                title="New Account"
                onSave={createAccount}
                open={openDialog === "NEW_ACCOUNT"}
            />
            <SubscriptionFormDrawer
                title="New Subscription"
                onSave={createSubscription}
                open={openDialog === "NEW_SUBSCRIPTION"}
            />
            <TransactionFormDrawer
                title="New Transaction"
                onSave={createTransaction}
                open={openDialog === "NEW_TRANSACTION"}
            />
            <PlanFormDrawer
                title="New Plan"
                onSave={createPlan}
                open={openDialog === "NEW_PLAN"}
            />

            {renderNotification(notification)}
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    return {
        openDialog: state.openDialog,
        notification: state.notification,
    };
}

const mapDispatchToProps = {
    closeNotification: actions.closeNotification,
    createAccount: actions.createAccount,
    createPlan: actions.createPlan,
    createSubscription: actions.createSubscription,
    createTransaction: actions.createTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
