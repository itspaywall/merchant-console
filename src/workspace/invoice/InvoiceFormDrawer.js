import React from "react";
import PropTypes from "prop-types";

import { extractValues } from "../RecordForm";

import FormDrawer from "../common/FormDrawer";

// text, large_text, number, date_picker, date_range_picker, switch, phone_number, email_address
// multiple_options (multiselect), single_option (drop down)
// lookup - organization, user, invoice

// Only top level children can have quickAdd. Groups cannot have required, unique, multipleValues, mininmumValues, maximumValues.
// Groups can have readOnly, hidden, tooltip
// The same person can work in multiple organizations. But such cases are rare. Therefore, the system should be kept
// simple and not accomodate such cases. given, there are other work arounds.

// The user name should be unique across your organization.
const groups = [
    {
        label: "Basic",
        children: [
            {
                label: "Notes",
                identifier: "notes",
                type: "large_text",
                rows: 4,
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The notes for the invoice.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Terms and Conditions",
                identifier: "termsAndConditions",
                rows: 4,
                type: "large_text",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The terms and conditions applied to the invoice.",
                multipleValues: false,
                defaultValue: "",
            },
        ],
    },
];

function InvoiceFormDrawer(props) {
    const { title, onSave, showMore, open } = props;

    const values = props.invoice || extractValues(groups);
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

InvoiceFormDrawer.propTypes = {
    title: PropTypes.string.isRequired,
    showMore: PropTypes.bool,
    invoice: PropTypes.object,
    onSave: PropTypes.func.isRequired,
};

InvoiceFormDrawer.defaultProps = {
    showMore: false,
    invoice: null,
    onCancel: null,
};

export default InvoiceFormDrawer;
