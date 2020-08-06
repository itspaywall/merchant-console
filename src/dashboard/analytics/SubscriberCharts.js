import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import LineGraph from "./LineGraph";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 0,
        minHeight: 600,
        maxHeight: 600,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
    const renderTitle1 = (count) =>
        count === 1 ? `${count} subscriber` : `${count} subscribers`;
    const renderTitle2 = (count) => `${count}% `;

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.content}>
                <LineGraph
                    data={props.data}
                    title={"Net Subscriber Change"}
                    color={"#2196f3"}
                    graphColor={"paired"}
                    axisLeft={"Subscriptions"}
                    axisBottom={"Months"}
                    renderTitle={renderTitle1}
                />
                <div className={classes.space}></div>
                <LineGraph
                    data={props.data}
                    title={"Subscriber Churn Rate"}
                    color={"#ff1744"}
                    graphColor={"set1"}
                    axisLeft={"Subscriptions"}
                    axisBottom={"Months"}
                    renderTitle={renderTitle2}
                />
            </CardContent>
        </Card>
    );
}

export default SubscriberCharts;
