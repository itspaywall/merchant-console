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

function RevenueCharts(props) {
    const classes = useStyles();

    const { revenueData, transactionData } = props;

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <BarGraph
                    data={revenueData}
                    title="Revenue Status"
                    names={["Billed Revenue", "Revenue Past Due"]}
                    keys={["billedRevenue", "revenuePastDue"]}
                    info="The split-up of recovered and due revenue."
                    color="blues"
                />
                <BarGraph
                    data={transactionData}
                    title="Transactions Breakdown"
                    names={[
                        "Pending",
                        "Payment Failed",
                        "No Billing Info",
                        "Cancelled",
                        "Converted",
                    ]}
                    keys={[
                        "pending",
                        "paymentFailed",
                        "noBillingInfo",
                        "cancelled",
                        "converted",
                    ]}
                    info="The split-up of all transactions."
                    color="reds"
                />
            </CardContent>
        </Card>
    );
}

export default RevenueCharts;
