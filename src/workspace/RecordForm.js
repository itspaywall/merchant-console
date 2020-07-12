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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    extraAction: {
        textTransform: 'none'
    },
    tabText: {
        fontWeight: 600,
        fontSize: 13
    }
}));

// text, large_text, number, date_picker, date_range_picker, switch, phone_number, email_address
// multiple_options (multiselect), single_option (drop down)
// lookup - organization, user, contact 

export default function RecordForm(props) {
    const { groups, showMore } = props;
    const classes = useStyles(props);
    const [ tabIndex, setTabIndex ] = React.useState(0);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container={ true } spacing={ 2 }>
                {showMore && (<Grid item={ true } lg={ 4 }>
                    <List component="nav">
                        {
                            groups.map((group, groupIndex) => (
                                <ListItem button={ true } selected={ tabIndex == groupIndex } onClick={ () => setTabIndex(groupIndex) }>
                                    <ListItemText primary={ group.label } className={ classes.tabText } />
                                </ListItem>))
                        }
                    </List>
                </Grid>)}
                <Grid item={ true } lg={ showMore? 8 : 12 }>
                    <Grid container={ true } spacing={ 2 }>
                        {
                            groups.map((group, groupIndex) =>
                                group.children.map(
                                    (field, fieldIndex) =>
                                        ((!showMore && field.quickAdd) || (showMore && (groupIndex == tabIndex)))?
                                            (<Grid item={ true } lg={ 12 }>
                                                {
                                                    field.type != 'date' && (<TextField
                                                        className={ fieldIndex > 0? "mt-8" : "mt-0" }
                                                        label={ field.label }
                                                        id={ field.identifier }
                                                        name={ field.identifier }
                                                        type="text"
                                                        variant="outlined"
                                                        fullWidth={ true }
                                                        required={ field.required }
                                                    />)
                                                }

                                                {
                                                    field.type == 'date' && (<KeyboardDatePicker
                                                        margin="normal"
                                                        id={ field.identifier }
                                                        label={ field.label }
                                                        format="MM/dd/yyyy"
                                                        inputVariant="outlined"
                                                        fullWidth={ true }
                                                        />)
                                                }
                                            </Grid>) : null)
                                )
                        }
                    </Grid>
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>);
}
