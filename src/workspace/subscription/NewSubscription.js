import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/styles";
import RecordForm from "../RecordForm";
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
                label: "Plan",
                identifier: "plan",
                type: "text_field",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The plan associated with the subscription.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Billing Period",
                identifier: "billingPeriod",
                type: "text_field",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The billing period of the subscription.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Billing Period Unit",
                identifier: "billingPeriodUnit",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The number of billing period units.",
                multipleValues: true,
                defaultValue: "",
            },
            {
                label: "Setup Fee",
                identifier: "setupFee",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The fee required for setup of the subscription.",
                multipleValues: true,
                defaultValue: "",
            },
            {
                label: "Trial Period",
                identifier: "trailPeriod",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The period of the trail subscription.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Trial Period Unit",
                identifier: "trialPeriodUnit",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "Number of units of trial period.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Starts",
                identifier: "starts",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "Start date of the subscription.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Term",
                identifier: "term",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "Term of the subscription.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Term Unit",
                identifier: "termUnit",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "Unit of the term.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Renew",
                identifier: "renew",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip:
                    "Boolean value stating whether subscription is recurring.",
                multipleValues: false,
                defaultValue: "",
            },
        ],
    },
    {
        label: "Organization",
        children: [
            {
                label: "Plan",
                identifier: "plan",
                type: "text_field",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The plan associated with the subscription.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Billing Period",
                identifier: "billingPeriod",
                type: "text_field",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The billing period of the subscription.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Billing Period Unit",
                identifier: "billingPeriodUnit",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The number of billing period units.",
                multipleValues: true,
                defaultValue: "",
            },
            {
                label: "Setup Fee",
                identifier: "setupFee",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The fee required for setup of the subscription.",
                multipleValues: true,
                defaultValue: "",
            },
            {
                label: "Trial Period",
                identifier: "trailPeriod",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The period of the trail subscription.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Trial Period Unit",
                identifier: "trialPeriodUnit",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "Number of units of trial period.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Starts",
                identifier: "starts",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "Start date of the subscription.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Term",
                identifier: "term",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "Term of the subscription.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Term Unit",
                identifier: "termUnit",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "Unit of the term.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Renew",
                identifier: "renew",
                type: "text_field",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip:
                    "Boolean value stating whether subscription is recurring.",
                multipleValues: false,
                defaultValue: "",
            },
        ],
    },
];

function extractValues(groups) {
    const result = [];
    groups.forEach((group) => {
        const values = group.children.map((field) => ({
            identifier: field.identifier,
            value: field.defaultValue,
        }));
        result.push(values);
    });
    return result;
}

function extractRecord(groups) {
    const result = {};
    groups.forEach((group) =>
        group.forEach((field) => (result[field.identifier] = field.value))
    );
    return result;
}

function NewSubscription(props) {
    const { closeDialog, createSubscription } = props;
    const classes = useStyles(props);
    const [showMore, setShowMore] = React.useState(false);
    const [values, setValues] = React.useState(extractValues(groups));
    const handleShowMore = () => {
        setShowMore(!showMore);
    };
    const handleSave = () => {
        closeDialog();
        createSubscription(extractRecord(values));
    };
    // TODO: Create a deep copy without serializing !
    const handleValueChange = (group, field, value) => {
        const newValues = JSON.parse(JSON.stringify(values));
        newValues[group][field].value = value;

        setValues(newValues);
    };

    return (
        <Dialog
            open={true}
            onClose={closeDialog}
            aria-labelledby="form-dialog-title"
            className={showMore ? classes.mainMore : classes.mainLess}
        >
            <DialogTitle id="form-dialog-title">New Subscription</DialogTitle>
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

const mapDispatchToProps = {
    closeDialog: actions.closeDialog,
    createSubscription: actions.createSubscription,
};

export default connect(null, mapDispatchToProps)(NewSubscription);
