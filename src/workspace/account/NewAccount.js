import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/styles';
import RecordForm from '../RecordForm';

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
// lookup - organization, user, contact 

// Only top level children can have quickAdd. Groups cannot have required, unique, multipleValues, mininmumValues, maximumValues.
// Groups can have readOnly, hidden, tooltip
// The same person can work in multiple organizations. But such cases are rare. Therefore, the system should be kept
// simple and not accomodate such cases. given, there are other work arounds.
const groups = [
    {
        label: 'Basic',
        children: [
            {
                label: 'First Name',
                identifier: 'firstName',
                type: 'text_field',
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: 'The first name of the contact.',
                multipleValues: false
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
                tooltip: 'The last name of the contact.',
                multipleValues: false
            },
            {
                label: 'Email Address',
                identifier: 'emailAddress',
                type: 'email_address',
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: 'The email address of the contact.',
                multipleValues: true
            },
            {
                label: 'Phone Number',
                identifier: 'phoneNumber',
                type: 'phone_number',
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: 'The phone number of the contact.',
                multipleValues: true
            },
            {
                label: 'Organization',
                id: 'organization',
                name: 'organization',
                type: 'organization',
                required: true,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: 'The organization for which the contact works.',
                multipleValues: false
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
                tooltip: 'The position of the contact in the organization.',
                multipleValues: false
            }
        ]
    }
];

export default function NewAccount(props) {
    const { onClose } = props;
    // TODO: onClose
    const classes = useStyles(props);
    const [ showMore, setShowMore ] = React.useState(false);
    const handleShowMore = () => {
        setShowMore(!showMore);
    }

    return (
        <Dialog open={ true } onClose={ onClose } aria-labelledby="form-dialog-title" className={ showMore? classes.mainMore : classes.mainLess }>
            <DialogTitle id="form-dialog-title">New Contact</DialogTitle>
            <DialogContent>
                <RecordForm showMore={ showMore } onShowMore={ handleShowMore } groups={ groups } />
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
                    <Button onClick={onClose} color="primary" className={ classes.dialogAction }>
                        Save
                    </Button>
                    <Button onClick={ onClose } color="primary" className={ classes.dialogAction }>
                        Cancel
                    </Button>
                </div>
            </DialogActions>
        </Dialog>);
}
