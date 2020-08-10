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

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 0,
        minHeight: 600,
        maxHeight: 600,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    content: {
        minHeight: 600,
        maxHeight: 600,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    style: {
        margin: 8,
        width: "auto",
        height: 240,
    },
    space: {
        margin: 4,
    },
}));

function LineGraph(props, theme) {
    const classes = useStyles();

    const data = [
        {
            name: "Page A",
            uv: 4000,
        },
        {
            name: "Page B",
            uv: 3000,
        },
        {
            name: "Page C",
            uv: 2000,
        },
        {
            name: "Page D",
            uv: 2780,
        },
        {
            name: "Page E",
            uv: 1890,
        },
        {
            name: "Page F",
            uv: 2390,
        },
        {
            name: "Page G",
            uv: 3490,
        },
    ];

    return (
        <div className={classes.style}>
            <Typography variant="subtitle1" color="textPrimary">
                {props.title}
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
                    <defs>
                        <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#1875d0"
                                stopOpacity={1}
                            />
                            <stop
                                offset="100%"
                                stopColor="#1875d0"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="uv"
                        stroke="#1875d0"
                        fill="url(#colorUv)"
                        activeDot={{ r: 8 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineGraph;
