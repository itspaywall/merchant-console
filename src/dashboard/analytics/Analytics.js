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
    container: {
        margin: 10,
        marginTop: 8,
    },
    item: {
        padding: 10,
    },
    title: {
        margin: 24,
        marginBottom: 0,
    },
}));

function Analytics(props) {
    const classes = useStyles();
    const { analytics, fetchAnalytics } = props;
    const revenueData = analytics.revenueData;
    const subscriberData = analytics.subscriberData;
    const planData = analytics.planData;
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
                <Grid container={true} className={classes.container}>
                    <Grid item={true} className={classes.item} xs={12} md={3}>
                        <SubscriptionsSummary
                            subscribers="1123"
                            subscribersChange="48"
                            subscribersDelta="positive"
                            period="Last 30 days"
                            ltv="₹13,666"
                            ltvChange="$121"
                            ltvDelta="negative"
                            churnRate="34.21%"
                            churnChange="2.32%"
                            churnDelta="positive"
                        />
                    </Grid>
                    <Grid item={true} className={classes.item} xs={12} md={9}>
                        <SubscriberCharts data={subscriberData} />
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
                        <RevenueSummary
                            totalRevenue="₹2,02,764"
                            totalRevenueChange="₹10,048"
                            totalRevenueDelta="positive"
                            period="Last 30 days"
                            recoveredRevenue="₹1,86,634"
                            recoveredRevenueChange="₹10,121"
                            recoveredRevenueDelta="negative"
                            dueRevenue="₹16,130"
                            dueRevenueChange="₹6,123"
                            dueRevenueDelta="positive"
                        />
                    </Grid>
                    <Grid item={true} className={classes.item} xs={12} md={9}>
                        <RevenueCharts data={revenueData} />
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
                        <PlanSummary
                            conversions="323"
                            conversionsChange="48"
                            conversionsDelta="positive"
                            period="Last 30 days"
                            conversionRate="23.21%"
                            conversionRateChange="2.32%"
                            conversionRateDelta="negative"
                            cancellationRate="4.21%"
                            cancellationRateChange="0.12%"
                            cancellationRateDelta="positive"
                        />
                    </Grid>
                    <Grid item={true} className={classes.item} xs={12} md={9}>
                        <PlanCharts data={planData} />
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
