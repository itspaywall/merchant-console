import React from "react";
import { connect } from "react-redux";

import * as actions from "../../redux/actions";
import PlanFormDrawer from "./PlanFormDrawer";

function EditPlan(props) {
    const { plan, savePlan } = props;
    return (
        <PlanFormDrawer
            title="Edit Plan"
            showMore={true}
            onSave={savePlan}
            plan={plan}
            open={true}
        />
    );
}

function mapStateToProps(state) {
    return {
        plan: state.plan,
    };
}

const mapDispatchToProps = {
    savePlan: actions.savePlan,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPlan);
