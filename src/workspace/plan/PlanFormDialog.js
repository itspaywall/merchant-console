import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import RecordForm from "../RecordForm";
import { extractValues } from "../RecordForm";
import * as actions from "../../redux/actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    extraAction: {
        textTransform: "none",
    },
    dialogAction: {
        textTransform: "none",
    },
    mainMore: {
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 800,
    },
    mainLess: {
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 500,
    },
    actions: {
        width: "100%",
    },
    extraActions: {
        width: "50%",
        display: "flex",
    },
    dialogActions: {
        width: "50%",
        display: "flex",
        flexDirection: "row-reverse",
    },
}));

const groups = [
    {
        label: "Basic",
        children: [
            {
                label: "Name",
                identifier: "name",
                type: "text_field",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The name of the plan.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Code",
                identifier: "code",
                type: "text_field",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The code of the plan.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Description",
                identifier: "description",
                type: "large_text",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The code of the plan.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Billing Period",
                identifier: "billingPeriod",
                type: "integer",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The billing period of the plan.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Billing Period Unit",
                identifier: "billingPeriodUnit",
                type: "select",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The billing period unit of the plan.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Price Per Period",
                identifier: "pricePerBillingPeriod",
                type: "number",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The billing period unit of the plan.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Setup Fee",
                identifier: "setupFee",
                type: "number",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The billing period unit of the plan.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Trial Period",
                identifier: "trialPeriod",
                type: "integer",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The trial period of the plan.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Trial Period Unit",
                identifier: "trialPeriodUnit",
                type: "select",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The trial period unit of the plan.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Term",
                identifier: "term",
                type: "integer",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The term of the plan.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Term Unit",
                identifier: "termUnit",
                type: "select",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The term unit of the plan.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Renew",
                identifier: "renew",
                type: "switch",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip:
                    "Determines whether the subscription renews after the term.",
                multipleValues: false,
                defaultValue: "",
            },
        ],
    },
];

function PlanFormDialog(props) {
    const { closeDialog, title, onSave } = props;
    const classes = useStyles(props);
    const [showMore, setShowMore] = React.useState(props.showMore);
    const [values, setValues] = React.useState(
        props.account || extractValues(groups)
    );
    const handleShowMore = () => {
        setShowMore(!showMore);
    };
    const handleSave = () => {
        closeDialog();
        onSave(values);
    };
    // TODO: Create a deep copy without serializing !
    const handleValueChange = (field, value) => {
        const newValues = JSON.parse(JSON.stringify(values));
        newValues[field.identifier] = value;

        setValues(newValues);
    };

    return (
        <Dialog
            open={true}
            className={showMore ? classes.mainMore : classes.mainLess}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <RecordForm
                    showMore={showMore}
                    onShowMore={handleShowMore}
                    groups={groups}
                    values={values}
                    onValueChange={handleValueChange}
                />
            </DialogContent>
            <DialogActions>
                <div className={classes.extraActions}>
                    <Button
                        size="small"
                        variant="text"
                        onClick={handleShowMore}
                        color="secondary"
                        className={classes.extraAction}
                    >
                        <Icon>
                            {showMore
                                ? "keyboard_arrow_up"
                                : "keyboard_arrow_down"}
                        </Icon>
                        {showMore ? "Show Less" : "Show More"}
                    </Button>

                    {/*
                    <Button size="small" variant="text" onClick={ ... } color="secondary" className={ classes.extraAction }>
                        <Icon>edit</Icon>
                        Customize Fields
                    </Button>*/}
                </div>
                <div className={classes.dialogActions}>
                    <Button
                        onClick={handleSave}
                        color="primary"
                        className={classes.dialogAction}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={closeDialog}
                        color="primary"
                        className={classes.dialogAction}
                    >
                        Cancel
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
}

PlanFormDialog.propTypes = {
    title: PropTypes.string.isRequired,
    showMore: PropTypes.bool,
    account: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
};

PlanFormDialog.defaultProps = {
    showMore: false,
    account: null,
    onCancel: null,
};

const mapDispatchToProps = {
    closeDialog: actions.closeDialog,
};

export default connect(null, mapDispatchToProps)(PlanFormDialog);
