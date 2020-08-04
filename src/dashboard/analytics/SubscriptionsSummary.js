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
        minHeight: 600,
        maxHeight: 600,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    details: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        paddingTop: 24,
        paddingBottom: 24,
        flex: "1 0 auto",
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
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.details}>
                <Summary
                    title="Total Subscriptions"
                    period={props.period}
                    number={props.subscribers}
                    change={props.subscribersChange}
                    delta={props.subscribersDelta}
                />
                <Divider />
                <Summary
                    title="Subscriber Lifetime Value"
                    period={props.period}
                    number={props.ltv}
                    change={props.ltvChange}
                    delta={props.ltvDelta}
                />
                <Divider />
                <Summary
                    title="Subscriber Churn Rate"
                    period={props.period}
                    number={props.churnRate}
                    change={props.churnChange}
                    delta={props.churnDelta}
                />
            </CardContent>
        </Card>
    );
}
