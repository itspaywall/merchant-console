import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    style: {
        margin: 8,
        width: "auto",
        height: 240,
    },
}));

function BarGraph(props, theme) {
    const classes = useStyles();
    const data = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
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
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Gold Plan" stackId="a" fill="#8884d8" />
                    <Bar dataKey="Silver Plan" stackId="a" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarGraph;
