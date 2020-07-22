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
                            currentPeriodStart={
                                /* subscription.currentPeriodStart */ "TODO"
                            }
                            currentPeriodEnd={
                                /* subscription.currentPeriodEnd */ "TODO"
                            }
                            plan={subscription.plan.name}
                            billingPeriod={subscription.billingPeriod}
                            billingPeriodUnit={subscription.billingPeriodUnit}
                            setupFee={subscription.setupFee}
                            trialPeriod={subscription.trialPeriod}
                            trialPeriodUnit={subscription.trialPeriodUnit}
                            startedOn={subscription.starts}
                            term={subscription.term}
                            termUnit={subscription.termUnit}
                            renews={/*subscription.renews*/ "TODO"}
                            createdOn={subscription.createdOn}
                            status={"active"}
                            collection={"TODO"}
                            renewsOn={"TODO"}
                            pricePerUnit={
                                subscription.plan.pricePerBillingPeriod
                            }
                            estimatedTotal={
                                subscription.plan.pricePerBillingPeriod +
                                " * units"
                            }
                            showMore={false}
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
