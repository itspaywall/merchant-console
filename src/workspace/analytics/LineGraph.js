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
        marginBottom: 48,
        width: "auto",
        height: 220,
    },
    tooltip: {
        justifyContent: "center",
        padding: 8,
    },
    item: {
        margin: 2,
    },
    subtitle: {
        color: "#777777",
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

    const { title, name, color, dataKey, info, data } = props;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <Paper className={classes.tooltip} elevation={4}>
                    <div
                        className={classes.item}
                    >{`Month: ${months[label]}`}</div>
                    <hr />
                    <div className={classes.item}>
                        {`${name}: ${payload[0].value}`}
                    </div>
                </Paper>
            );
        }
        return null;
    };
    return (
        <div className={classes.style}>
            <Typography variant="subtitle1" color="textPrimary">
                <div className={classes.title}>{title}</div>
                <div className={classes.subtitle}>{info}</div>
            </Typography>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
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
                        dataKey={dataKey}
                        stroke={color}
                        fill={color}
                        activeDot={{ r: 4 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineGraph;
