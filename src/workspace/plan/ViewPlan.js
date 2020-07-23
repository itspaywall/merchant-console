import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";

import WorkspaceToolbar from "../common/WorkspaceToolbar";
import PlanCard from "./PlanCard";
import * as actions from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 16,
    },
    planCard: {
        maxWidth: 600,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 16,
        fontWeight: 500,
    },
    progress: {
        position: "fixed",
        top: "50%",
        left: "50%",
        marginTop: -24,
        marginLeft: -24,
    },
}));

function ViewPlan(props) {
    const classes = useStyles();
    const { plan, fetchPlan, clearPlan, editPlan } = props;
    const { identifier } = useParams();

    const handleEdit = () => {
        editPlan(plan);
    };

    useEffect(() => {
        fetchPlan(identifier);
        return clearPlan;
    }, [identifier, fetchPlan, clearPlan]);

    return (
        <div>
            <WorkspaceToolbar title="Plan" />
            {!plan && (
                <CircularProgress size="48px" className={classes.progress} />
            )}
            {plan && (
                <div className={classes.container}>
                    <div className={classes.section}>
                        <Typography
                            variant="h2"
                            className={classes.sectionTitle}
                        >
                            General
                        </Typography>
                        <PlanCard
                            className={classes.planCard}
                            onEdit={handleEdit}
                            {...plan}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        plan: state.plan,
    };
}

const mapDispatchToProps = {
    fetchPlan: actions.fetchPlan,
    clearPlan: actions.clearPlan,
    editPlan: actions.editPlan,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewPlan));
