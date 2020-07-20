import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";

import WorkspaceToolbar from "../common/WorkspaceToolbar";
import SubscriptionCard from "../subscription/SubscriptionCard";
import AccountCard from "./AccountCard";
import * as actions from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 16,
    },
    accountCard: {
        maxWidth: 600,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 16,
        fontWeight: 500,
    },
    subscriptions: {},
    progress: {
        position: "fixed",
        top: "50%",
        left: "50%",
        marginTop: -24,
        marginLeft: -24,
    },
}));

const subscriptions = [
    {
        identifier: "1",
        currentPeriod: "May 03 1999 — May 19 1999",
        plan: "Premium",
        status: "trial",
        termBehavior: "Renews",
        collection: "Manual",
        renewsOn: "May 03 1999, 3:36 AM",
        startedOn: "May 19 1999, 3:36 AM",
        pricePerUnit: "100 INR",
        estimatedTotal: "200 INR",
    },
    {
        identifier: "2",
        currentPeriod: "May 03 1999 — May 19 1999",
        plan: "Platinum",
        status: "active",
        termBehavior: "Renews",
        collection: "Manual",
        renewsOn: "May 03 1999, 3:36 AM",
        startedOn: "May 19 1999, 3:36 AM",
        pricePerUnit: "100 INR",
        estimatedTotal: "200 INR",
    },
];

// Some fields aren't being rendered.
function ViewAccount(props) {
    const classes = useStyles();
    const { fetchAccount, clearAccount, account, editAccount } = props;
    const { identifier } = useParams();

    const handleEditAccount = () => {
        editAccount(account);
    };

    useEffect(() => {
        fetchAccount(identifier);
        return clearAccount;
    }, [identifier, fetchAccount, clearAccount]);

    return (
        <div>
            <WorkspaceToolbar title="Account" />
            {!account && (
                <CircularProgress size="48px" className={classes.progress} />
            )}
            {account && (
                <div className={classes.container}>
                    <div className={classes.section}>
                        <Typography
                            variant="h2"
                            className={classes.sectionTitle}
                        >
                            General
                        </Typography>
                        <AccountCard
                            className={classes.accountCard}
                            onEdit={handleEditAccount}
                            {...account}
                        />
                    </div>

                    <div className={classes.section}>
                        <Typography
                            variant="h2"
                            className={classes.sectionTitle}
                        >
                            Subscriptions
                        </Typography>
                        <Grid
                            container={true}
                            className={classes.subscriptions}
                            spacing={2}
                        >
                            {subscriptions.map((subscription) => (
                                <Grid
                                    key={subscription.identifier}
                                    item={true}
                                    lg={4}
                                >
                                    <SubscriptionCard
                                        currentPeriod={
                                            subscription.currentPeriod
                                        }
                                        plan={subscription.plan}
                                        status={subscription.status}
                                        termBehavior={subscription.termBehavior}
                                        collection={subscription.collection}
                                        renewsOn={subscription.renewsOn}
                                        startedOn={subscription.startedOn}
                                        pricePerUnit={subscription.pricePerUnit}
                                        estimatedTotal={
                                            subscription.estimatedTotal
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
            )}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        account: state.account,
    };
}

const mapDispatchToProps = {
    fetchAccount: actions.fetchAccount,
    clearAccount: actions.clearAccount,
    editAccount: actions.editAccount,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewAccount));
