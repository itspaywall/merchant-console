import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 0,
        minHeight: 600,
        maxHeight: 600,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    toolTip: {
        backgroundcolor: "",
        border: "1px solid",
        borderRadius: 4,
        padding: theme.spacing(2),
        fontSize: 12,
        color: "white",
        fontWeight: "bold",
        boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
        marginBottom: theme.spacing(2),
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

function LineGraph(props, theme) {
    const classes = useStyles();
    const { renderTitle, color } = props;
    const toolTipElement = (props) => {
        return (
            <div
                className={classes.toolTip}
                style={{
                    backgroundColor: color,
                }}
            >
                {renderTitle(props.point.data.y)}
            </div>
        );
    };
    return (
        <div className={classes.style}>
            <Typography variant="subtitle1" color="textPrimary">
                {props.title}
            </Typography>
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
                areaOpacity={0.1}
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
                    legend: props.axisLeft,
                    legendOffset: -32,
                    legendPosition: "middle",
                }}
                axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: props.axisRight,
                    legendOffset: 32,
                    legendPosition: "middle",
                }}
                tooltip={toolTipElement}
                colors={{ scheme: props.graphColor }}
            />
        </div>
    );
}

export default LineGraph;
