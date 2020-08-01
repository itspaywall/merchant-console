import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import NetSubscriberChange from "./NetSubscriberChange";
import WorkspaceToolbar from "../../workspace/common/WorkspaceToolbar";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 15,
        minHeight: "450px",
    },
    box: {
        height: 10,
    },
}));

const data = {
    id: "Subscriptions",
    data: [
        { x: 0, y: 7 },
        { x: 1, y: 5 },
        { x: 2, y: 11 },
        { x: 3, y: 9 },
        { x: 4, y: 13 },
        { x: 5, y: 16 },
        { x: 6, y: 12 },
        { x: 7, y: 9 },
        { x: 8, y: 13 },
    ],
};

function Analytics() {
    const classes = useStyles();
    return (
        <div className={classes.box}>
            <WorkspaceToolbar title="Analytics" />
            <Grid container={true} className={classes.container}>
                <Grid item={true} alignItems={"center"} justify={"center"}>
                    <NetSubscriberChange data={data} />
                </Grid>
            </Grid>
        </div>
    );
}

export default Analytics;
