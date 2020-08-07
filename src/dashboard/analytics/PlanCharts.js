import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import BarGraph from "./BarGraph";

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
}));

function PlanCharts(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.content}>
                <BarGraph
                    data={props.data}
                    title="Plans Breakdown"
                    graphColor="paired"
                    keys={[
                        "Gold Plan",
                        "Silver Plan",
                        "Bronze Plan",
                        "Platinum Plan",
                    ]}
                    index="month"
                    axisLeft="Total Conversions"
                    axisBottom="Months"
                />
                <BarGraph
                    data={props.data}
                    title="Conversions Breakdown"
                    graphColor="nivo"
                    keys={[
                        "Gold Plan",
                        "Silver Plan",
                        "Bronze Plan",
                        "Platinum Plan",
                    ]}
                    index="month"
                    axisLeft="Total Conversions"
                    axisBottom="Months"
                />
            </CardContent>
        </Card>
    );
}

export default PlanCharts;
