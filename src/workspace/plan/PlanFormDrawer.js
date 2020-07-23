import React from "react";
import PropTypes from "prop-types";

import { extractValues } from "../RecordForm";

import FormDrawer from "../common/FormDrawer";

const groups = [
    {
        label: "Basic",
        children: [
            {
                label: "Name",
                identifier: "name",
                type: "text",
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
                type: "text",
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
                rows: 8,
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

function PlanFormDrawer(props) {
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

PlanFormDrawer.propTypes = {
    title: PropTypes.string.isRequired,
    showMore: PropTypes.bool,
    account: PropTypes.object,
    onSave: PropTypes.func.isRequired,
};

PlanFormDrawer.defaultProps = {
    showMore: false,
    account: null,
    onCancel: null,
};

export default PlanFormDrawer;
