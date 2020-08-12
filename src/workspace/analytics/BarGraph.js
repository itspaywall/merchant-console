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
        margin: 16,
        marginBottom: 88,
        width: "auto",
        height: 240,
        justifyContent: "center",
    },
    tooltip: {
        justifyContent: "center",
        padding: 8,
    },
    item: {
        margin: 2,
    },
    parent: {
        display: "flex",
        flexDirection: "row",
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

const colors = {
    blues: ["#90CAF9", "#42A5F5", "#1E88E5", "#1565C0", "#0D47A1"],
    reds: ["#FFCDD2", "#E57373", "#F44336", "#D32F2F", "#B71C1C"],
    purples: ["#E1BEE7", "#BA68C8", "#9C27B0", "#7B1FA2", "#4A148C"],
    oranges: ["#FFE0B2", "#FFB74D", "#FF9800", "#F57C00", "#E65100"],
};

function BarGraph(props, theme) {
    const classes = useStyles();
    const { title, names, info, data, keys, color } = props;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <Paper className={classes.tooltip} elevation={4}>
                    <div className={classes.item}>
                        {`Month: ${months[label]}`}
                    </div>
                    <hr />
                    {props.names.map((name, index) => (
                        <div className={classes.parent}>
                            <div
                                className={classes.item}
                                style={{ color: colors[color][index] }}
                            >
                                ◼
                            </div>
                            <div className={classes.item}>
                                {`${name}: ${payload[index].value}`}
                            </div>
                        </div>
                    ))}
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
                <BarChart
                    data={data}
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
                    {keys.map((bar, index) => (
                        <Bar
                            name={names[index]}
                            dataKey={bar}
                            stackId="a"
                            fill={colors[color][index]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarGraph;
