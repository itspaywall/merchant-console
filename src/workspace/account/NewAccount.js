import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/styles';
import RecordForm from '../RecordForm';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    extraAction: {
        textTransform: 'none'
    },
    dialogAction: {
        textTransform: 'none'
    },
    mainMore: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 800
    },
    mainLess: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 500
    },
    actions: {
        width: '100%',
    },
    extraActions: {
        width: '50%',
        display: 'flex'
    },
    dialogActions: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row-reverse'
    }
}));

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
        label: 'Basic',
        children: [
            {
                label: 'User Name',
                identifier: 'userName',
                type: 'text_field',
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: 'The user name of the account.',
                multipleValues: false,
                defaultValue: ''
            },
            {
                label: 'First Name',
                identifier: 'firstName',
                type: 'text_field',
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: 'The first name of the account.',
                multipleValues: false,
                defaultValue: ''
            },
            {
                label: 'Last Name',
                identifier: 'lastName',
                type: 'text_field',
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: 'The last name of the account.',
                multipleValues: false,
                defaultValue: ''
            },
            {
                label: 'Email Address',
                identifier: 'emailAddress',
                type: 'email_address',
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: 'The email address of the account.',
                multipleValues: true,
                defaultValue: ''
            },
            {
                label: 'Phone Number',
                identifier: 'phoneNumber',
                type: 'phone_number',
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: 'The phone number of the account.',
                multipleValues: true,
                defaultValue: ''
            },
            {
                label: 'Address Line 1',
                identifier: 'addressLine1',
                type: 'text_field',
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: 'The first line of address.',
                multipleValues: false,
                defaultValue: ''
            },
            {
                label: 'Address Line 2',
                identifier: 'addressLine2',
                type: 'text_field',
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: 'The first line of address.',
                multipleValues: false,
                defaultValue: ''
            },
            {
                label: 'City',
                identifier: 'city',
                type: 'text_field',
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: 'The city.',
                multipleValues: false,
                defaultValue: ''
            },
            {
                label: 'State',
                identifier: 'state',
                type: 'text_field',
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: 'The state where the customer resides.',
                multipleValues: false,
                defaultValue: ''
            },
            {
                label: 'Country',
                identifier: 'country',
                type: 'text_field',
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: 'The country where the customer resides.',
                multipleValues: false,
                defaultValue: ''
            },
            {
                label: 'Zip Code',
                identifier: 'zipCode',
                type: 'text_field',
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: 'The zip code of the location where the customer resides.',
                multipleValues: false,
                defaultValue: ''
            }
        ]
    },
    {
        label: 'Organization',
        children: [
            {
                label: 'Name',
                identifier: 'companyName',
                type: 'text_field',
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: 'The last name of the account.',
                multipleValues: false,
                defaultValue: ''
            },
            {
                label: 'Position',
                id: 'position',
                name: 'position',
                type: 'text',
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: 'The position of the account in the organization.',
                multipleValues: false,
                defaultValue: ''
            },
            {
                label: 'Email Address',
                identifier: 'companyEmailAddress',
                type: 'email_address',
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: 'The email address of the account.',
                multipleValues: true,
                defaultValue: ''
            },
            {
                label: 'Phone Number',
                identifier: 'companyPhoneNumber',
                type: 'phone_number',
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: 'The phone number of the account.',
                multipleValues: true,
                defaultValue: ''
            }
        ]
    }
];

function extractValues(groups) {
    const result = [];
    groups.forEach(group => {
        const values = group.children.map(field => ({
            identifier: field.identifier,
            value: field.defaultValue
        }));
        result.push(values);
    });
    return result;
}

function extractRecord(groups) {
    const result = {};
    groups.forEach(group =>
        group.forEach(field =>
            result[field.identifier] = field.value)
    );
    return result;
}

function NewAccount(props) {
    const { closeDialog, createAccount } = props;
    const classes = useStyles(props);
    const [ showMore, setShowMore ] = React.useState(false);
    const [ values, setValues ] = React.useState(extractValues(groups));
    const handleShowMore = () => {
        setShowMore(!showMore);
    }
    const handleSave = () => {
        closeDialog();
        createAccount(extractRecord(values));
    }
    // TODO: Create a deep copy without serializing !
    const handleValueChange = (group, field, value) => {
        const newValues = JSON.parse(JSON.stringify(values));
        newValues[group][field].value = value;

        setValues(newValues);
    }

    return (
        <Dialog open={ true } onClose={ closeDialog } aria-labelledby="form-dialog-title" className={ showMore? classes.mainMore : classes.mainLess }>
            <DialogTitle id="form-dialog-title">New Account</DialogTitle>
            <DialogContent>
                <RecordForm showMore={ showMore } onShowMore={ handleShowMore } groups={ groups } values={ values } onValueChange={ handleValueChange } />
            </DialogContent>
            <DialogActions>
                <div className={ classes.extraActions }>
                    <Button size="small" variant="text" onClick={ handleShowMore } color="secondary" className={ classes.extraAction }>
                        <Icon>{ showMore? "keyboard_arrow_up" : "keyboard_arrow_down" }</Icon>
                        { showMore? "Show Less" : "Show More" }
                    </Button>

                     {/*
                    <Button size="small" variant="text" onClick={ ... } color="secondary" className={ classes.extraAction }>
                        <Icon>edit</Icon>
                        Customize Fields
                    </Button>*/}
                </div>
                <div className={ classes.dialogActions }>
                    <Button onClick={ handleSave } color="primary" className={ classes.dialogAction }>
                        Save
                    </Button>
                    <Button onClick={ closeDialog } color="primary" className={ classes.dialogAction }>
                        Cancel
                    </Button>
                </div>
            </DialogActions>
        </Dialog>);
}

const mapDispatchToProps = {
    closeDialog: actions.closeDialog,
    createAccount: actions.createAccount
};

export default connect(null, mapDispatchToProps)(NewAccount);