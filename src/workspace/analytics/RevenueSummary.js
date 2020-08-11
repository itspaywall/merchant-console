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

export default function RevenueSummary(props) {
    const classes = useStyles();
    const { data } = props;
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.details}>
                <Summary
                    title="Total Billed Revenue"
                    period={data.period}
                    number={`₹ ${data.totalRevenue}`}
                    change={`₹ ${data.totalRevenueChange}`}
                    delta={data.totalRevenueDelta}
                />
                <Divider />
                <Summary
                    title="Recovered Revenue"
                    period={data.period}
                    number={`₹ ${data.recoveredRevenue}`}
                    change={`₹ ${data.recoveredRevenueChange}`}
                    delta={data.recoveredRevenueDelta}
                />
                <Divider />
                <Summary
                    title="Revenue Past Due"
                    period={data.period}
                    number={`₹ ${data.dueRevenue}`}
                    change={`₹ ${data.dueRevenueChange}`}
                    delta={data.dueRevenueDelta}
                />
            </CardContent>
        </Card>
    );
}
