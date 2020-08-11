import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import BarGraph from "./BarGraph";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 0,
        minHeight: 700,
        maxHeight: 700,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
}));

function PlanCharts(props) {
    const classes = useStyles();

    const { planData, conversionData } = props;

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <BarGraph
                    data={planData}
                    title="Plans Breakdown"
                    names={[
                        "Gold Plan",
                        "Silver Plan",
                        "Bronze Plan",
                        "Platinum Plan",
                    ]}
                    keys={[
                        "goldPlan",
                        "silverPlan",
                        "bronzePlan",
                        "platinumPlan",
                    ]}
                    info="The split-up of net subscribers for each plan."
                    color="purples"
                />
                <BarGraph
                    data={conversionData}
                    title="Conversions Breakdown"
                    names={["New", "Reactivated", "Churned"]}
                    keys={["new", "reactivated", "churned"]}
                    info="The split-up of all monthly changes in your customer base."
                    color="oranges"
                />
            </CardContent>
        </Card>
    );
}

export default PlanCharts;
