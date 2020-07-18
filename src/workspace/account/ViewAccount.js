import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import WorkspaceTableToolbar from "../common/WorkspaceTableToolbar";
import SubscriptionCard from "../subscription/SubscriptionCard";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 16,
    },
    subscriptionsTitle: {
        fontSize: 20,
        marginTop: 16,
        marginLeft: 16,
        fontWeight: 500,
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

// TODO: WorkspaceTableToolbar should be renamed to WorkspaceToolbar.
// Further, it should allow us to specify custom buttons.
function ViewAccount(props) {
    const classes = useStyles();
    return (
        <div>
            <WorkspaceTableToolbar title="Customer Name" />
            <Typography variant="h2" className={classes.subscriptionsTitle}>
                Subscriptions
            </Typography>
            <Grid container={true} className={classes.container} spacing={2}>
                {subscriptions.map((subscription) => (
                    <Grid key={subscription.identifier} item={true} lg={4}>
                        <SubscriptionCard
                            currentPeriod={subscription.currentPeriod}
                            plan={subscription.plan}
                            status={subscription.status}
                            termBehavior={subscription.termBehavior}
                            collection={subscription.collection}
                            renewsOn={subscription.renewsOn}
                            startedOn={subscription.startedOn}
                            pricePerUnit={subscription.pricePerUnit}
                            estimatedTotal={subscription.estimatedTotal}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

function mapStateToProps(state) {
    return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAccount);
