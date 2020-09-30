import React from "react";
import PropTypes from "prop-types";

import { extractValues } from "../common/RecordForm";
import FormDrawer from "../common/FormDrawer";

const groups = [
    {
        label: "Basic",
        children: [
            {
                label: "Account",
                identifier: "accountId",
                type: "account_lookup",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The account associated with the subscription.",
                multipleValues: false,
                defaultValue: null,
            },
            {
                label: "Plan",
                identifier: "planId",
                type: "plan_lookup",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The plan associated with the subscription.",
                multipleValues: false,
                defaultValue: null,
            },
            {
                label: "Quantity",
                identifier: "quantity",
                type: "number",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The quantity of the plan.",
                multipleValues: false,
                defaultValue: null,
                validations: "isNumeric",
                validationErrors: {
                    isNumeric: "Please enter a valid number.",
                },
            },
            {
                label: "Starts",
                identifier: "startsAt",
                type: "date_time",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "Start date time of the subscription.",
                multipleValues: false,
                defaultValue: new Date(),
            },
            {
                label: "Price Per Billing Cycle",
                identifier: "pricePerBillingCycle",
                type: "number",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The price per billing cycle.",
                multipleValues: true,
                defaultValue: 0,
                validations: "isNumeric",
                validationErrors: {
                    isNumeric: "Please enter a valid number.",
                },
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
                tooltip: "The fee required for setup of the subscription.",
                multipleValues: true,
                defaultValue: 0,
                validations: "isNumeric",
                validationErrors: {
                    isNumeric: "Please enter a valid number.",
                },
            },
            {
                label: "Total Billing Cycles",
                identifier: "totalBillingCycles",
                type: "integer",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The total number of billing cycles in the term.",
                multipleValues: false,
                defaultValue: 0,
                validations: "isInt",
                validationErrors: {
                    isInt: "Please enter a valid integer.",
                },
            },
            {
                label: "Renews",
                identifier: "renews",
                type: "switch",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip:
                    "Boolean value stating whether subscription is recurring.",
                multipleValues: false,
                defaultValue: false,
            },
            {
                label: "Notes",
                identifier: "notes",
                type: "large_text",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip:
                    "Notes about this subscription. It is displayed in the invoice.",
                multipleValues: false,
                defaultValue: false,
            },
            {
                label: "Terms and Conditions",
                identifier: "termsAndConditions",
                type: "large_text",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip:
                    "Terms and conditions applied to this subscription. It is displayed in the invoice and can be used to highlight important terms and conditions related to the subscription or charges.",
                multipleValues: false,
                defaultValue: false,
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
            onSave={(values) => {
                console.log(values);
                onSave(values);
            }}
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
