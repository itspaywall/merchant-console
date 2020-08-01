import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { ResponsiveLine } from "@nivo/line";
import { makeStyles } from "@material-ui/core/styles";

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
        minHeight: 450,
        minWidth: 600,
        width: "100%",
    },
    style: {
        width: 800,
        height: 400,
    },
}));

function NetSubscriberChange(props) {
    const classes = useStyles();
    const toolTipElement = (props) => {
        return (
            <div className={classes.toolTip}>
                {props.point.data.y}
                {props.point.data.y === 1 ? " subscriber" : " subscribers"}
            </div>
        );
    };
    return (
        <Card>
            <CardHeader
                titleTypographyProps={{ variant: "h6" }}
                title="Net Subscriber Change"
            />
            <CardContent className={classes.content}>
                <div className={classes.style}>
                    <ResponsiveLine
                        animate={true}
                        enableSlices={false}
                        margin={{
                            top: 20,
                            right: 40,
                            bottom: 40,
                            left: 40,
                        }}
                        curve="monotoneX"
                        data={[props.data]}
                        enableArea={true}
                        areaOpacity={0.07}
                        useMesh={true}
                        crosshairType="cross"
                        enablePointLabel={true}
                        pointSize={14}
                        pointBorderWidth={1}
                        xScale={{
                            type: "point",
                            min: 0,
                            max: "auto",
                        }}
                        yScale={{
                            type: "linear",
                            min: 0,
                            max: "auto",
                        }}
                        axisLeft={{
                            orient: "left",
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Subscriptions",
                            legendOffset: -32,
                            legendPosition: "middle",
                        }}
                        axisBottom={{
                            orient: "bottom",
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Months",
                            legendOffset: 32,
                            legendPosition: "middle",
                        }}
                        tooltip={toolTipElement}
                        colors={{ scheme: "paired" }}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default NetSubscriberChange;
