import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    style: {
        margin: 8,
        width: "auto",
        height: 240,
    },
    tooltip: {
        border: "1px solid #D3D3D3",
        borderRadius: 0,
        justifyContent: "center",
        variant: "outlined",
        padding: 8,
        maxWidth: 240,
    },
    item: {
        margin: 2,
    },
}));

const months = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
};

const colors = ["#4285F4", "#EA4335", "#FBBC04", "#34A853", "#5F6368"];

function BarGraph(props, theme) {
    const classes = useStyles();

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <Paper className={classes.tooltip} elevation={0}>
                    <div
                        className={classes.item}
                    >{`Month : ${months[label]}`}</div>
                    {props.keys.map((bar, index) => (
                        <div
                            className={classes.item}
                            style={{ color: colors[index] }}
                        >{`${bar} : ${payload[index].value}`}</div>
                    ))}
                    <div className={classes.item} style={{ color: "#777777" }}>
                        {props.info}
                    </div>
                </Paper>
            );
        }
        return null;
    };

    return (
        <div className={classes.style}>
            <Typography variant="subtitle1" color="textPrimary">
                {props.title}
            </Typography>
            <ResponsiveContainer>
                <BarChart
                    data={props.data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {props.keys.map((bar, index) => (
                        <Bar dataKey={bar} stackId="a" fill={colors[index]} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarGraph;
