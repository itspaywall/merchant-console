import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    extraAction: {
        textTransform: "none",
    },
    tabText: {
        fontWeight: 600,
        fontSize: 13,
    },
}));

// text, large_text, number, date_picker, date_range_picker, switch, phone_number, email_address
// multiple_options (multiselect), single_option (drop down)
// lookup - organization, user, contact

export function extractValues(groups) {
    const result = {};
    groups.forEach((group) => {
        group.children.forEach(
            (field) => (result[field.identifier] = field.defaultValue)
        );
    });
    return result;
}

export default function RecordForm(props) {
    const { values, groups, showMore, onValueChange, tabIndex } = props;
    const classes = useStyles(props);

    console.log(tabIndex);

    const makeChangeHandler = (field) => (event) => {
        onValueChange(field, event.target.value);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container={true} spacing={2} className={classes.root}>
                {groups.map((group, groupIndex) =>
                    group.children.map((field, fieldIndex) =>
                        (!showMore && field.quickAdd) ||
                        (showMore && groupIndex === tabIndex) ? (
                            <Grid key={field.identifier} item={true} lg={12}>
                                {field.type !== "date" && (
                                    <TextField
                                        className={
                                            fieldIndex > 0 ? "mt-8" : "mt-0"
                                        }
                                        label={field.label}
                                        id={field.identifier}
                                        name={field.identifier}
                                        type="text"
                                        variant="outlined"
                                        fullWidth={true}
                                        required={field.required}
                                        value={values[field.identifier]}
                                        onChange={makeChangeHandler(field)}
                                    />
                                )}

                                {field.type === "date" && (
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id={field.identifier}
                                        label={field.label}
                                        format="MM/dd/yyyy"
                                        inputVariant="outlined"
                                        fullWidth={true}
                                    />
                                )}
                            </Grid>
                        ) : null
                    )
                )}
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
