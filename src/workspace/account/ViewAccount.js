import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import WorkspaceTableToolbar from "../common/WorkspaceTableToolbar";
import SubscriptionCard from "../subscription/SubscriptionCard";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 16,
    },
}));

// TODO: WorkspaceTableToolbar should be renamed to WorkspaceToolbar.
// Further, it should allow us to specify custom buttons.
function ViewAccount(props) {
    const classes = useStyles();
    return (
        <div>
            <WorkspaceTableToolbar title="Customer Name" />
            <Grid container={true} className={classes.container} spacing={1}>
                <Grid item={true} lg={3}>
                    <SubscriptionCard
                        currentPeriod="May 03 1999 — May 19 1999"
                        plan="Premium"
                        status="active"
                        termBehavior="Renews"
                        collection="Manual"
                        renewsOn="May 03 1999, 3:36 AM"
                        startedOn="May 19 1999, 3:36 AM"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

function mapStateToProps(state) {
    return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAccount);
