import React from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { makeStyles } from "@material-ui/core/styles";
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        variant: "outlined",
        padding: 8,
        maxWidth: 160,
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

function LineGraph(props, theme) {
    const classes = useStyles();
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <Paper className={classes.tooltip} elevation={0}>
                    <div
                        className={classes.item}
                    >{`Month : ${months[label]}`}</div>
                    <div
                        className={classes.item}
                        style={{ color: props.color }}
                    >{`${props.what} : ${payload[0].value}`}</div>
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
                <AreaChart
                    data={props.data}
                    margin={{
                        top: 24,
                        right: 24,
                        left: 8,
                        bottom: 24,
                    }}
                >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey={props.what}
                        stroke={props.color}
                        fill={props.color}
                        activeDot={{ r: 8 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineGraph;
