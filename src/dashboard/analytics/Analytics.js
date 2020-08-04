import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import NetSubscriberChangeChart from "./NetSubscriberChangeChart";
import PlansChart from "./PlansChart";
import RevenueChart from "./RevenueChart";
import SubscriberChurnRateChart from "./SubscriberChurnRateChart";

import TotalSubscriptionsCard from "./TotalSubscriptionsCard";
import TotalTransactionsCard from "./TotalTransactionsCard";
import SubscriberChurnRateCard from "./SubscriberChurnRateCard";
import SubscriberLifetimeValueCard from "./SubscriberLifetimeValueCard";

import WorkspaceToolbar from "../../workspace/common/WorkspaceToolbar";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 10,
    },
    item: {
        padding: 10,
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

const pieData = [
    {
        id: "python",
        label: "python",
        value: 527,
        color: "hsl(121, 70%, 50%)",
    },
    {
        id: "scala",
        label: "scala",
        value: 423,
        color: "hsl(138, 70%, 50%)",
    },
    {
        id: "sass",
        label: "sass",
        value: 414,
        color: "hsl(144, 70%, 50%)",
    },
    {
        id: "java",
        label: "java",
        value: 465,
        color: "hsl(157, 70%, 50%)",
    },
    {
        id: "hack",
        label: "hack",
        value: 90,
        color: "hsl(78, 70%, 50%)",
    },
];

const revenueData = [
    {
        month: "Jan",
        "hot dog": 71,
        "hot dogColor": "hsl(282, 70%, 50%)",
        burger: 0,
        burgerColor: "hsl(180, 70%, 50%)",
        sandwich: 73,
        sandwichColor: "hsl(277, 70%, 50%)",
        kebab: 177,
        kebabColor: "hsl(149, 70%, 50%)",
        fries: 77,
        friesColor: "hsl(260, 70%, 50%)",
        donut: 133,
        donutColor: "hsl(26, 70%, 50%)",
    },
    {
        month: "Feb",
        "hot dog": 177,
        "hot dogColor": "hsl(79, 70%, 50%)",
        burger: 51,
        burgerColor: "hsl(109, 70%, 50%)",
        sandwich: 182,
        sandwichColor: "hsl(232, 70%, 50%)",
        kebab: 17,
        kebabColor: "hsl(239, 70%, 50%)",
        fries: 28,
        friesColor: "hsl(191, 70%, 50%)",
        donut: 57,
        donutColor: "hsl(352, 70%, 50%)",
    },
    {
        month: "Mar",
        "hot dog": 25,
        "hot dogColor": "hsl(156, 70%, 50%)",
        burger: 45,
        burgerColor: "hsl(128, 70%, 50%)",
        sandwich: 172,
        sandwichColor: "hsl(222, 70%, 50%)",
        kebab: 70,
        kebabColor: "hsl(277, 70%, 50%)",
        fries: 31,
        friesColor: "hsl(242, 70%, 50%)",
        donut: 186,
        donutColor: "hsl(158, 70%, 50%)",
    },
    {
        month: "Apr",
        "hot dog": 92,
        "hot dogColor": "hsl(298, 70%, 50%)",
        burger: 52,
        burgerColor: "hsl(10, 70%, 50%)",
        sandwich: 21,
        sandwichColor: "hsl(106, 70%, 50%)",
        kebab: 92,
        kebabColor: "hsl(41, 70%, 50%)",
        fries: 180,
        friesColor: "hsl(24, 70%, 50%)",
        donut: 41,
        donutColor: "hsl(168, 70%, 50%)",
    },
    {
        month: "May",
        "hot dog": 28,
        "hot dogColor": "hsl(105, 70%, 50%)",
        burger: 5,
        burgerColor: "hsl(207, 70%, 50%)",
        sandwich: 88,
        sandwichColor: "hsl(267, 70%, 50%)",
        kebab: 146,
        kebabColor: "hsl(73, 70%, 50%)",
        fries: 121,
        friesColor: "hsl(333, 70%, 50%)",
        donut: 53,
        donutColor: "hsl(305, 70%, 50%)",
    },
    {
        month: "Jun",
        "hot dog": 128,
        "hot dogColor": "hsl(218, 70%, 50%)",
        burger: 28,
        burgerColor: "hsl(303, 70%, 50%)",
        sandwich: 145,
        sandwichColor: "hsl(268, 70%, 50%)",
        kebab: 120,
        kebabColor: "hsl(112, 70%, 50%)",
        fries: 155,
        friesColor: "hsl(110, 70%, 50%)",
        donut: 145,
        donutColor: "hsl(323, 70%, 50%)",
    },
    {
        month: "Jul",
        "hot dog": 10,
        "hot dogColor": "hsl(117, 70%, 50%)",
        burger: 72,
        burgerColor: "hsl(306, 70%, 50%)",
        sandwich: 187,
        sandwichColor: "hsl(118, 70%, 50%)",
        kebab: 65,
        kebabColor: "hsl(236, 70%, 50%)",
        fries: 184,
        friesColor: "hsl(277, 70%, 50%)",
        donut: 117,
        donutColor: "hsl(177, 70%, 50%)",
    },
];

function Analytics() {
    const classes = useStyles();
    return (
        <div className={classes.box}>
            <WorkspaceToolbar title="Analytics" />
            <Grid container={true} className={classes.container}>
                <Grid item={true} className={classes.item} xs={12} sm={3}>
                    <SubscriberLifetimeValueCard
                        data="$34,244"
                        change="$234"
                        delta="positive"
                        period="Last 30 days"
                    />
                </Grid>
                <Grid item={true} className={classes.item} xs={12} sm={3}>
                    <SubscriberChurnRateCard
                        data="12.34%"
                        change="2.31%"
                        delta="negative"
                        period="Last 30 days"
                    />
                </Grid>
                <Grid item={true} className={classes.item} xs={12} md={3}>
                    <TotalSubscriptionsCard
                        data="1123"
                        change="48"
                        delta="positive"
                        period="Last 30 days"
                    />
                </Grid>
                <Grid item={true} className={classes.item} xs={12} md={3}>
                    <TotalTransactionsCard
                        data="2432"
                        change="112"
                        delta="negative"
                        period="Last 30 days"
                    />
                </Grid>
                <Grid item={true} className={classes.item} xs={12} md={6}>
                    <NetSubscriberChangeChart data={data} />
                </Grid>
                <Grid item={true} className={classes.item} xs={12} md={6}>
                    <PlansChart data={pieData} />
                </Grid>
                <Grid item={true} className={classes.item} xs={12} md={6}>
                    <SubscriberChurnRateChart data={data} />
                </Grid>
                <Grid item={true} className={classes.item} xs={12} md={6}>
                    <RevenueChart data={revenueData} />
                </Grid>
            </Grid>
        </div>
    );
}

export default Analytics;
