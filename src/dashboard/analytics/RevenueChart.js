import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { ResponsiveBar } from "@nivo/bar";

const useStyles = makeStyles((theme) => ({
    chartRoot: {
        padding: theme.spacing(10),
        borderRadius: theme.spacing(2),
        backgroundColor: "white",
        width: 620,
        height: 240,
        border: "1px solid rgba(0,0,0,0.15)",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
            border: "1px solid " + theme.palette.primary.main,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
        },
    },
    toolTip: {
        backgroundColor: theme.palette.primary.main,
        border: "1px solid" + theme.palette.primary.main,
        borderRadius: 4,
        padding: theme.spacing(2),
        fontSize: 12,
        color: "white",
        fontWeight: "bold",
        boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
        marginBottom: theme.spacing(2),
    },
    content: {
        minHeight: 400,
    },
    style: {
        width: "auto",
        height: 400,
    },
}));

function RevenueChart(props) {
    const classes = useStyles();
    return (
        <Card variant="outlined">
            <CardHeader
                titleTypographyProps={{ variant: "h6" }}
                title="Revenue"
            />
            <CardContent className={classes.content}>
                <div className={classes.style}>
                    <ResponsiveBar
                        data={props.data}
                        keys={[
                            "hot dog",
                            "burger",
                            "sandwich",
                            "kebab",
                            "fries",
                            "donut",
                        ]}
                        indexBy="month"
                        margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
                        padding={0.3}
                        colors={{ scheme: "paired" }}
                        borderColor={{
                            from: "color",
                            modifiers: [["darker", 1.6]],
                        }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Month",
                            legendPosition: "middle",
                            legendOffset: 32,
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Revenue",
                            legendPosition: "middle",
                            legendOffset: -40,
                        }}
                        enableLabel={false}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default RevenueChart;
