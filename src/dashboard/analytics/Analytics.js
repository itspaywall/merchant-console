import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
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

const data = {
    id: "Subscriptions",
    data: [
        { x: 0, y: 7 },
        { x: 1, y: 5 },
        { x: 2, y: 11 },
        { x: 3, y: 9 },
        { x: 4, y: 13 },
        { x: 5, y: 16 },
        { x: 6, y: 12 },
        { x: 7, y: 9 },
        { x: 8, y: 13 },
    ],
};

const revenueData = [
    {
        month: "Jan",
        "Billed Revenue": 10237,
        "Revenue Past Due": 2572,
    },
    {
        month: "Feb",
        "Billed Revenue": 11287,
        "Revenue Past Due": 3357,
    },
    {
        month: "Mar",
        "Billed Revenue": 15087,
        "Revenue Past Due": 5057,
    },
    {
        month: "Apr",
        "Billed Revenue": 12087,
        "Revenue Past Due": 3057,
    },
    {
        month: "Jun",
        "Billed Revenue": 14287,
        "Revenue Past Due": 3257,
    },
    {
        month: "Jul",
        "Billed Revenue": 10237,
        "Revenue Past Due": 2572,
    },
    {
        month: "Aug",
        "Billed Revenue": 19087,
        "Revenue Past Due": 4057,
    },
    {
        month: "Sep",
        "Billed Revenue": 10237,
        "Revenue Past Due": 2572,
    },
    {
        month: "Oct",
        "Billed Revenue": 11287,
        "Revenue Past Due": 3357,
    },
    {
        month: "Nov",
        "Billed Revenue": 15087,
        "Revenue Past Due": 5057,
    },
    {
        month: "Dec",
        "Billed Revenue": 12087,
        "Revenue Past Due": 3057,
    },
];

const plansData = [
    {
        month: "Jan",
        "Gold Plan": 23,
        "Silver Plan": 26,
        "Bronze Plan": 22,
        "Platinum Plan": 27,
    },
    {
        month: "Feb",
        "Gold Plan": 32,
        "Silver Plan": 31,
        "Bronze Plan": 38,
        "Platinum Plan": 35,
    },
    {
        month: "Mar",
        "Gold Plan": 34,
        "Silver Plan": 37,
        "Bronze Plan": 39,
        "Platinum Plan": 31,
    },
    {
        month: "Apr",
        "Gold Plan": 23,
        "Silver Plan": 29,
        "Bronze Plan": 26,
        "Platinum Plan": 24,
    },
    {
        month: "Jun",
        "Gold Plan": 12,
        "Silver Plan": 39,
        "Bronze Plan": 25,
        "Platinum Plan": 29,
    },
    {
        month: "Jul",
        "Gold Plan": 23,
        "Silver Plan": 26,
        "Bronze Plan": 22,
        "Platinum Plan": 27,
    },
    {
        month: "Aug",
        "Gold Plan": 19,
        "Silver Plan": 22,
        "Bronze Plan": 47,
        "Platinum Plan": 34,
    },
    {
        month: "Sep",
        "Gold Plan": 23,
        "Silver Plan": 26,
        "Bronze Plan": 22,
        "Platinum Plan": 27,
    },
    {
        month: "Oct",
        "Gold Plan": 32,
        "Silver Plan": 31,
        "Bronze Plan": 38,
        "Platinum Plan": 35,
    },
    {
        month: "Nov",
        "Gold Plan": 34,
        "Silver Plan": 37,
        "Bronze Plan": 39,
        "Platinum Plan": 31,
    },
    {
        month: "Dec",
        "Gold Plan": 23,
        "Silver Plan": 29,
        "Bronze Plan": 26,
        "Platinum Plan": 24,
    },
];

function Analytics() {
    const classes = useStyles();
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
                        <SubscriberCharts data={data} />
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
                        <PlanCharts data={plansData} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Analytics;
