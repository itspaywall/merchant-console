import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";

import WorkspaceToolbar from "../common/WorkspaceToolbar";
import SubscriptionCard from "../subscription/SubscriptionCard";
import * as actions from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 16,
    },
    subscriptionCard: {
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

// Some fields aren't being rendered.
function ViewSubscription(props) {
    const classes = useStyles();
    const { fetchSubscription, clearSubscription, subscription } = props;
    const { identifier } = useParams();

    useEffect(() => {
        fetchSubscription(identifier);
        return clearSubscription;
    }, [identifier, fetchSubscription, clearSubscription]);

    return (
        <div>
            <WorkspaceToolbar title="Subscription" />
            {!subscription && (
                <CircularProgress size="48px" className={classes.progress} />
            )}
            {subscription && (
                <div className={classes.container}>
                    <div className={classes.section}>
                        <Typography
                            variant="h2"
                            className={classes.sectionTitle}
                        >
                            General
                        </Typography>
                        <SubscriptionCard
                            className={classes.subscriptionCard}
                            accountId={subscription.account.id}
                            accountUserName={subscription.account.userName}
                            accountFirstName={subscription.account.firstName}
                            accountLastName={subscription.account.lastName}
                            planId={subscription.plan.id}
                            planName={subscription.plan.name}
                            planCode={subscription.plan.code}
                            status={subscription.status}
                            quantity={subscription.quantity}
                            billingPeriod={subscription.billingPeriod}
                            billingPeriodUnit={subscription.billingPeriodUnit}
                            setupFee={subscription.setupFee}
                            trialPeriod={subscription.trialPeriod}
                            trialPeriodUnit={subscription.trialPeriodUnit}
                            term={subscription.term}
                            termUnit={subscription.termUnit}
                            renews={subscription.renews}
                            createdAt={subscription.createdAt}
                            pricePerUnit={
                                subscription.plan.pricePerBillingPeriod
                            }
                            currentPeriodStart={subscription.currentPeriodStart}
                            currentPeriodEnd={subscription.currentPeriodEnd}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        subscription: state.subscription,
    };
}

const mapDispatchToProps = {
    fetchSubscription: actions.fetchSubscription,
    clearSubscription: actions.clearSubscription,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewSubscription));
