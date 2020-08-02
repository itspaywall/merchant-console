import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { ResponsivePie } from "@nivo/pie";

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
    content: {
        minHeight: 400,
    },
    style: {
        height: 400,
    },
}));

function PlansChart(props) {
    const classes = useStyles();
    return (
        <Card variant="outlined">
            <CardHeader
                titleTypographyProps={{ variant: "h6" }}
                title="Top Five Subscriptions"
            />
            <CardContent className={classes.content}>
                <div className={classes.style}>
                    <ResponsivePie
                        data={props.data}
                        margin={{ top: 32, right: 10, bottom: 10, left: 10 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        colors={{ scheme: "paired" }}
                        borderColor={{
                            from: "color",
                            modifiers: [["darker", "0"]],
                        }}
                        radialLabelsSkipAngle={7}
                        radialLabelsTextXOffset={6}
                        radialLabelsTextColor="#333333"
                        radialLabelsLinkOffset={0}
                        radialLabelsLinkDiagonalLength={16}
                        radialLabelsLinkHorizontalLength={24}
                        radialLabelsLinkStrokeWidth={1}
                        radialLabelsLinkColor={{ from: "color" }}
                        slicesLabelsSkipAngle={10}
                        slicesLabelsTextColor="#333333"
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default PlansChart;
