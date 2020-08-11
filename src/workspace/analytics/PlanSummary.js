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

export default function PlanSummary(props) {
    const classes = useStyles();
    const { data } = props;

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.details}>
                <Summary
                    title="Total Plans Converted"
                    period={data.period}
                    number={data.conversions}
                    change={data.conversionsChange}
                    delta={data.conversionsDelta}
                />
                <Divider />
                <Summary
                    title="Plans Conversion Rate"
                    period={data.period}
                    number={`${data.conversionRate}%`}
                    change={`${data.conversionRateChange}%`}
                    delta={data.conversionRateDelta}
                />
                <Divider />
                <Summary
                    title="Plans Cancellation Rate"
                    period={data.period}
                    number={`${data.cancellationRate}%`}
                    change={`${data.cancellationRateChange}%`}
                    delta={data.cancellationRateDelta}
                />
            </CardContent>
        </Card>
    );
}
