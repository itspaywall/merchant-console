import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import WorkspaceToolbar from "../../workspace/common/WorkspaceToolbar";
import Typography from "@material-ui/core/Typography";
import SubscriptionsSummary from "./SubscriptionsSummary";
import SubscriberCharts from "./SubscriberCharts";
import RevenueSummary from "./RevenueSummary";
import RevenueCharts from "./RevenueCharts";
import PlanSummary from "./PlanSummary";
import PlanCharts from "./PlanCharts";

const useStyles = makeStyles((theme) => ({
    item: {
        padding: 8,
    },
    title: {
        margin: 24,
        marginBottom: 0,
    },
}));

function Analytics(props) {
    const classes = useStyles();
    const { analytics, fetchAnalytics } = props;

    const subscriptionSummary = analytics.subscriptionSummary;
    const revenueSummary = analytics.revenueSummary;
    const planSummary = analytics.planSummary;
    const subscriberData = analytics.subscriberData;
    const churnRateData = analytics.churnRateData;
    const revenueData = analytics.revenueData;
    const transactionData = analytics.transactionData;
    const planData = analytics.planData;
    const conversionData = analytics.conversionData;

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    return (
        <div className={classes.box}>
            <WorkspaceToolbar title="Analytics" />
            <div>
                <Typography
                    variant="h6"
                    color="textPrimary"
                    className={classes.title}
                >
                    Subscribers
                </Typography>
                <Grid container={true}>
                    <Grid item={true} className={classes.item} xs={12} md={3}>
                        <SubscriptionsSummary data={subscriptionSummary} />
                    </Grid>
                    <Grid item={true} className={classes.item} xs={12} md={9}>
                        <SubscriberCharts
                            subscriberData={subscriberData}
                            churnRateData={churnRateData}
                        />
                    </Grid>
                </Grid>
            </div>
            <div>
                <Typography
                    variant="h6"
                    color="textPrimary"
                    className={classes.title}
                >
                    Revenue
                </Typography>
                <Grid container={true} className={classes.container}>
                    <Grid item={true} className={classes.item} xs={12} md={3}>
                        <RevenueSummary data={revenueSummary} />
                    </Grid>
                    <Grid item={true} className={classes.item} xs={12} md={9}>
                        <RevenueCharts
                            revenueData={revenueData}
                            transactionData={transactionData}
                        />
                    </Grid>
                </Grid>
            </div>
            <div>
                <Typography
                    variant="h6"
                    color="textPrimary"
                    className={classes.title}
                >
                    Plans
                </Typography>
                <Grid container={true} className={classes.container}>
                    <Grid item={true} className={classes.item} xs={12} md={3}>
                        <PlanSummary data={planSummary} />
                    </Grid>
                    <Grid item={true} className={classes.item} xs={12} md={9}>
                        <PlanCharts
                            planData={planData}
                            conversionData={conversionData}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

function mapStateToProps(props) {
    return {
        analytics: props.analytics,
    };
}

const mapDispatchToProps = {
    fetchAnalytics: actions.fetchAnalytics,
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
