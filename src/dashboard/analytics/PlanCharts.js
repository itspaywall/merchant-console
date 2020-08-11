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
                    data={props.planData}
                    title="Plans Breakdown"
                    keys={[
                        "Gold Plan",
                        "Silver Plan",
                        "Bronze Plan",
                        "Platinum Plan",
                    ]}
                    info="The split-up of net subscribers for each plan."
                />
                <BarGraph
                    data={props.conversionData}
                    title="Conversions Breakdown"
                    keys={["New", "Reactivated", "Churned"]}
                    info="The split-up of all monthly changes in your customer base."
                />
            </CardContent>
        </Card>
    );
}

export default PlanCharts;
