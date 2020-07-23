import React from "react";
import PropTypes from "prop-types";

import { extractValues } from "../RecordForm";

import FormDrawer from "../common/FormDrawer";

const groups = [
    {
        label: "Basic",
        children: [
            {
                label: "Plan",
                identifier: "plan",
                type: "text",
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
                type: "number",
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
                type: "select",
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
                type: "number",
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
                type: "number",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The period of the trail subscription.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Trial Period Unit",
                identifier: "trialPeriodUnit",
                type: "select",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "Number of units of trial period.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Starts",
                identifier: "starts",
                type: "date",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "Start date of the subscription.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Term",
                identifier: "term",
                type: "number",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "Term of the subscription.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Term Unit",
                identifier: "termUnit",
                type: "select",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "Unit of the term.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Renew",
                identifier: "renew",
                type: "switch",
                required: false,
                readOnly: false,
                quickAdd: true,
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

function SubscriptionFormDrawer(props) {
    const { title, onSave, showMore, open } = props;

    const values = props.account || extractValues(groups);
    return (
        <FormDrawer
            title={title}
            showMore={showMore}
            groups={groups}
            values={values}
            onSave={onSave}
            open={open}
        />
    );
}

SubscriptionFormDrawer.propTypes = {
    title: PropTypes.string.isRequired,
    showMore: PropTypes.bool,
    account: PropTypes.object,
    onSave: PropTypes.func.isRequired,
};

SubscriptionFormDrawer.defaultProps = {
    showMore: false,
    account: null,
    onCancel: null,
};

export default SubscriptionFormDrawer;
