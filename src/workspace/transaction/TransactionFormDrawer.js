import React from "react";
import PropTypes from "prop-types";

import { extractValues } from "../RecordForm";

import FormDrawer from "../common/FormDrawer";

const groups = [
    {
        label: "Basic",
        children: [
            {
                label: "Subscription",
                identifier: "subscription",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The plan associated with a subscription.",
                multipleValues: true,
                defaultValue: "",
            },
            {
                label: "Action",
                identifier: "action",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "Action can be purchase, verify or refund.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Payment Method",
                identifier: "paymentMethod",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "Method of Payment.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Payment Type",
                identifier: "paymentType",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "Recurring / One Time",
                multipleValues: false,
                defaultValue: "",
            },
        ],
    },
];

function TransactionFormDrawer(props) {
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

TransactionFormDrawer.propTypes = {
    title: PropTypes.string.isRequired,
    showMore: PropTypes.bool,
    account: PropTypes.object,
    onSave: PropTypes.func.isRequired,
};

TransactionFormDrawer.defaultProps = {
    showMore: false,
    account: null,
    onCancel: null,
};

export default TransactionFormDrawer;
