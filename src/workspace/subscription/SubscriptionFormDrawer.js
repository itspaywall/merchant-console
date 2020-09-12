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
            },
            {
                label: "Billing Period",
                identifier: "billingPeriod",
                type: "number",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The billing period of the subscription.",
                multipleValues: false,
                defaultValue: 0,
            },
            {
                label: "Billing Period Unit",
                identifier: "billingPeriodUnit",
                type: "select",
                options: [
                    {
                        value: "days",
                        title: "Days",
                    },
                    {
                        value: "months",
                        title: "Months",
                    },
                ],
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The number of billing period units.",
                multipleValues: true,
                defaultValue: "days",
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
                defaultValue: 0,
            },
            {
                label: "Trial Period",
                identifier: "trialPeriod",
                type: "number",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The period of the trail subscription.",
                multipleValues: false,
                defaultValue: 0,
            },
            {
                label: "Trial Period Unit",
                identifier: "trialPeriodUnit",
                type: "select",
                options: [
                    {
                        value: "days",
                        title: "Days",
                    },
                    {
                        value: "months",
                        title: "Months",
                    },
                ],
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "Number of units of trial period.",
                multipleValues: false,
                defaultValue: "days",
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
                defaultValue: 0,
            },
            {
                label: "Term Unit",
                identifier: "termUnit",
                type: "select",
                options: [
                    {
                        value: "days",
                        title: "Days",
                    },
                    {
                        value: "months",
                        title: "Months",
                    },
                ],
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "Unit of the term.",
                multipleValues: false,
                defaultValue: "days",
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
