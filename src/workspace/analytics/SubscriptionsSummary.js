import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Summary from "./Summary";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20,
        borderRadius: 0,
        minHeight: 700,
        maxHeight: 700,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    details: {
        display: "flex",
        flexDirection: "column",
    },
    button: {
        padding: 15,
        marginLeft: "auto",
    },
    upIcon: {
        verticalAlign: "bottom",
        fontSize: 32,
    },
    up: {
        color: theme.palette.success.main,
    },
    downIcon: {
        verticalAlign: "bottom",
        fontSize: 32,
    },
    down: {
        color: theme.palette.error.main,
    },
    small: {
        fontSize: 14,
    },
}));

export default function SubscriptionsSummary(props) {
    const classes = useStyles();
    const { data } = props;
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.details}>
                <Summary
                    title="Total Subscriptions"
                    period={data.period}
                    number={data.subscribers}
                    change={data.subscribersChange}
                    delta={data.subscribersDelta}
                />
                <Divider />
                <Summary
                    title="Subscriber Lifetime Value"
                    period={data.period}
                    number={`₹ ${data.ltv}`}
                    change={`₹ ${data.ltvChange}`}
                    delta={data.ltvDelta}
                />
                <Divider />
                <Summary
                    title="Subscriber Churn Rate"
                    period={data.period}
                    number={`${data.churnRate}%`}
                    change={`${data.churnChange}%`}
                    delta={data.churnDelta}
                />
            </CardContent>
        </Card>
    );
}
