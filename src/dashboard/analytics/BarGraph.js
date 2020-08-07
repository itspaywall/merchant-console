import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 0,
        minHeight: 600,
        maxHeight: 600,
    },
    tooltip: {
        border: 0,
        borderRadius: 4,
        padding: 16,
        fontSize: 12,
        color: "white",
        fontWeight: "bold",
        boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
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

const customTheme = {
    tooltip: {
        container: {
            borderRadius: 100,
            padding: 0,
        },
    },
    axis: {
        tickValues: 5,
        domain: {
            line: {
                stroke: "#111111",
                strokeWidth: 0.05,
            },
        },
        legend: {
            text: {
                fontSize: 12,
            },
        },
    },
    grid: {
        line: {
            stroke: "#111111",
            strokeWidth: 0.05,
        },
    },
    legends: {
        text: {
            fill: "#333333",
            fontSize: 12,
        },
    },
};

function BarGraph(props, theme) {
    const classes = useStyles();
    return (
        <div className={classes.style}>
            <Typography variant="subtitle1" color="textPrimary">
                {props.title}
            </Typography>
            <ResponsiveBar
                data={props.data}
                keys={props.keys}
                indexBy={props.index}
                margin={{ top: 20, right: 40, bottom: 80, left: 80 }}
                padding={0.5}
                colors={{ scheme: props.graphColor }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: props.axisBottom,
                    legendPosition: "middle",
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 10,
                    tickRotation: 0,
                    tickValues: 4,
                    legend: props.axisLeft,
                    legendPosition: "middle",
                    legendOffset: -60,
                }}
                legends={[
                    {
                        dataFrom: "keys",
                        anchor: "bottom",
                        direction: "row",
                        justify: false,
                        translateX: 0,
                        translateY: 60,
                        itemsSpacing: 10,
                        itemWidth: 110,
                        itemHeight: 10,
                        itemDirection: "left-to-right",
                        itemOpacity: 0.7,
                        symbolSize: 10,
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
                enableLabel={false}
                animate={true}
                theme={customTheme}
                tooltip={({ id, value, color }) => (
                    <strong
                        className={classes.tooltip}
                        style={{
                            color: "white",
                            background: color,
                        }}
                    >
                        {id}: {value}
                    </strong>
                )}
            />
        </div>
    );
}

export default BarGraph;
