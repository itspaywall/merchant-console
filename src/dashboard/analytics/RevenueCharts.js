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

function RevenueCharts(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.content}>
                <BarGraph
                    data={props.revenueData}
                    title="Revenue Status"
                    keys={["Billed Revenue", "Revenue Past Due"]}
                    info="The split-up of recovered and due revenue."
                />
                <BarGraph
                    data={props.transactionData}
                    title="Transactions Breakdown"
                    keys={[
                        "Pending",
                        "Payment Failed",
                        "No Billing Info",
                        "Cancelled",
                        "Converted",
                    ]}
                    info="The split-up of all transactions."
                />
            </CardContent>
        </Card>
    );
}

export default RevenueCharts;
