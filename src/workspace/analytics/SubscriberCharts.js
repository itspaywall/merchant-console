import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import LineGraph from "./LineGraph";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 0,
        minHeight: 700,
        maxHeight: 700,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    content: {
        minHeight: 600,
        maxHeight: 600,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    style: {
        margin: 20,
        width: "auto",
        height: 240,
    },
    space: {
        margin: 4,
    },
}));

function SubscriberCharts(props) {
    const classes = useStyles();

    const { subscriberData, churnRateData } = props;

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.content}>
                <LineGraph
                    data={subscriberData}
                    title="Net Subscriber Change"
                    name="Subscribers"
                    dataKey="subscribers"
                    color="#4285F4"
                    info="The net change in the absolute number of subscribers."
                />
                <div className={classes.space}></div>
                <LineGraph
                    data={churnRateData}
                    title="Subscriber Churn Rate"
                    name="Churn Rate"
                    dataKey="churnRate"
                    color="#EA4335"
                    info="The rate at which customers stop subscribing."
                />
            </CardContent>
        </Card>
    );
}

export default SubscriberCharts;
