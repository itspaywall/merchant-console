import React from "react";
import PropTypes from "prop-types";

import { extractValues } from "../common/RecordForm";

import FormDrawer from "../common/FormDrawer";

// text, large_text, number, date_picker, date_range_picker, switch, phone_number, email_address
// multiple_options (multiselect), single_option (drop down)
// lookup - organization, user, account

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
                label: "Name",
                identifier: "name",
                type: "text",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: true,
                hidden: false,
                tooltip: "The name of the API key.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Read Permissions",
                identifier: "readPermisions",
                type: "multi_select",
                options: [
                    {
                        value: "READ_ACCOUNTS",
                        title: "Accounts",
                    },
                    {
                        value: "READ_SUBSCRIPTIONS",
                        title: "Subscriptions",
                    },
                    {
                        value: "READ_INVOICES",
                        title: "Invoices",
                    },
                    {
                        value: "READ_TRANSACTIONS",
                        title: "Transactions",
                    },
                ],
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip:
                    "The resources that the API key provides read access to.",
                multipleValues: false,
                defaultValue: [],
            },
            {
                label: "Read Write Permissions",
                identifier: "readWritePermisions",
                type: "multi_select",
                options: [
                    {
                        value: "READ_WRITE_ACCOUNTS",
                        title: "Accounts",
                    },
                    {
                        value: "READ_WRITE_SUBSCRIPTIONS",
                        title: "Subscriptions",
                    },
                    {
                        value: "READ_WRITE_INVOICES",
                        title: "Invoices",
                    },
                    {
                        value: "READ_WRITE_TRANSACTIONS",
                        title: "Transactions",
                    },
                ],
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip:
                    "The resources that the API key provides read-write access to.",
                multipleValues: false,
                defaultValue: [],
            },
        ],
    },
];

function APIKeyFormDrawer(props) {
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

APIKeyFormDrawer.propTypes = {
    title: PropTypes.string.isRequired,
    showMore: PropTypes.bool,
    account: PropTypes.object,
    onSave: PropTypes.func.isRequired,
};

APIKeyFormDrawer.defaultProps = {
    showMore: false,
    account: null,
    onCancel: null,
};

export default APIKeyFormDrawer;
