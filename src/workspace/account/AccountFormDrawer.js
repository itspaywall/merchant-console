import React from "react";
import PropTypes from "prop-types";

import { extractValues } from "../RecordForm";

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
                label: "User Name",
                identifier: "userName",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The user name of the account.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "First Name",
                identifier: "firstName",
                type: "text",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The first name of the account.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Last Name",
                identifier: "lastName",
                type: "text",
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The last name of the account.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Email Address",
                identifier: "emailAddress",
                type: "email_address",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The email address of the account.",
                multipleValues: true,
                defaultValue: "",
            },
            {
                label: "Phone Number",
                identifier: "phoneNumber",
                type: "phone_number",
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The phone number of the account.",
                multipleValues: true,
                defaultValue: "",
            },
            {
                label: "Address Line 1",
                identifier: "addressLine1",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The first line of address.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Address Line 2",
                identifier: "addressLine2",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The first line of address.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "City",
                identifier: "city",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The city.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "State",
                identifier: "state",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The state where the customer resides.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Country",
                identifier: "country",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The country where the customer resides.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Zip Code",
                identifier: "zipCode",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip:
                    "The zip code of the location where the customer resides.",
                multipleValues: false,
                defaultValue: "",
            },
        ],
    },
];

function AccountFormDrawer(props) {
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

AccountFormDrawer.propTypes = {
    title: PropTypes.string.isRequired,
    showMore: PropTypes.bool,
    account: PropTypes.object,
    onSave: PropTypes.func.isRequired,
};

AccountFormDrawer.defaultProps = {
    showMore: false,
    account: null,
    onCancel: null,
};

export default AccountFormDrawer;
