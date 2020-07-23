import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/styles";
import { format } from "date-fns";
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

// date_range_picker, phone_number, email_address
// multiple_options (multiselect), single_option (drop down)
// lookup - organization, user, contact

/* The form configuration is basically an array of groups. Each group consists two attributes - `label`,
 * which is rendered on the left when you click `Shore More`, and `children` which is an array of objects
 * that describe fields. Whatever attribute is in the field configuration is accessible as
 * `field.attributeName` in `RecordForm`.
 */

export function extractValues(groups) {
    const result = {};
    groups.forEach((group) => {
        group.children.forEach(
            (field) => {
                if (field.type === "date_range") {
                    result[field.identifier] = {
                        option: field.defaultValue.option,
                        startDate: field.defaultValue.startDate,
                        endDate: field.defaultValue.endDate,
                    };
                }
                else {
                    result[field.identifier] = field.defaultValue;
                }
            }
        );
    });
    return result;
}

export default function RecordForm(props) {
    const { values, groups, showMore, onValueChange, tabIndex } = props;
    const classes = useStyles(props);

    const makeChangeHandler = (field) => (event) => {
        onValueChange(field, event.target.value);
    };

    const makeRangeHandler = (field) => (event) => {
        const newValue = Object.assign({}, values[field.identifier]);
        newValue.option = event.target.value;
        onValueChange(field, newValue);
    };

    const makeDateChangeHandler = (field, which) => (date) => {
        const newValue = Object.assign({}, values[field.identifier]);
        // ISO format
        newValue[which] = format(date, "yyyy/MM/dd");
        onValueChange(field, newValue);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container={true} spacing={2} className={classes.root}>
                {groups.map((group, groupIndex) =>
                    group.children.map((field, fieldIndex) =>
                        (!showMore && field.quickAdd) ||
                        (showMore && groupIndex === tabIndex) ? (
                            <Grid key={field.identifier} item={true} lg={12}>
                                {field.type === "text" && (
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
                                        size="small"
                                    />
                                )}

                                {field.type === "large_text" && (
                                    <TextField
                                        id={field.identifier}
                                        label={field.label}
                                        name={field.identifier}
                                        type="text"
                                        multiline={true}
                                        rows={field.rows || 4}
                                        fullWidth={true}
                                        variant="outlined"
                                        required={field.required}
                                        value={values[field.identifier]}
                                        onChange={makeChangeHandler(field)}
                                        size="small"
                                    />
                                )}

                                {field.type === "number" && (
                                    <TextField
                                        id={field.identifier}
                                        label={field.label}
                                        name={field.identifier}
                                        type="number"
                                        fullWidth={true}
                                        variant="outlined"
                                        required={field.required}
                                        value={values[field.identifier]}
                                        onChange={makeChangeHandler(field)}
                                        size="small"
                                    />
                                )}

                                {field.type === "date" && (
                                    <KeyboardDatePicker
                                        id={field.identifier}
                                        label={field.label}
                                        name={field.identifier}
                                        format="MM/dd/yyyy"
                                        fullWidth={true}
                                        inputVariant="outlined"
                                        required={field.required}
                                        value={
                                            !values[field.identifier]
                                                ? new Date()
                                                : new Date(
                                                      values[field.identifier]
                                                  )
                                        }
                                        margin="normal"
                                        onChange={makeDateChangeHandler(
                                            field,
                                            "startDate"
                                        )}
                                        size="small"
                                    />
                                )}

                                {field.type === "switch" && (
                                    <FormGroup>
                                        <FormControlLabel
                                            id={field.identifier}
                                            label={field.label}
                                            name={field.identifier}
                                            control={<Switch color="primary" />}
                                            required={field.required}
                                            value={values[field.identifier]}
                                            onChange={makeChangeHandler(field)}
                                        />
                                    </FormGroup>)}

                                {field.type === "date_range" && (
                                    <div>
                                        <FormControl
                                            variant="outlined"
                                            fullWidth={true}
                                            size="small"
                                        >
                                            <InputLabel id={field.identifier}>
                                                {field.title}
                                            </InputLabel>
                                            <Select
                                                labelId={field.identifier}
                                                value={
                                                    values[field.identifier]
                                                        .option
                                                }
                                                onChange={makeRangeHandler(
                                                    field
                                                )}
                                                label={field.title}
                                            >
                                                {field.options.map((option) => (
                                                    <MenuItem
                                                        value={option.value}
                                                    >
                                                        {option.title}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {values[field.identifier].option ===
                                            "custom" && (
                                            <React.Fragment>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id={
                                                        field.identifier +
                                                        "Start"
                                                    }
                                                    label={field.startTitle}
                                                    format="MM/dd/yyyy"
                                                    inputVariant="outlined"
                                                    fullWidth={true}
                                                    size="small"
                                                    value={
                                                        !values[field.identifier].startDate
                                                            ? new Date()
                                                            : new Date(
                                                                  values[
                                                                      field.identifier
                                                                  ].startDate
                                                              )
                                                    }
                                                    onChange={makeDateChangeHandler(
                                                        field,
                                                        "startDate"
                                                    )}
                                                />
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id={
                                                        field.identifier + "End"
                                                    }
                                                    label={field.endTitle}
                                                    format="MM/dd/yyyy"
                                                    inputVariant="outlined"
                                                    fullWidth={true}
                                                    size="small"
                                                    value={
                                                        !values[field.identifier].endDate
                                                            ? new Date()
                                                            : new Date(
                                                                  values[
                                                                      field.identifier
                                                                  ].endDate
                                                              )
                                                    }
                                                    onChange={makeDateChangeHandler(
                                                        field,
                                                        "endDate"
                                                    )}
                                                />
                                            </React.Fragment>
                                        )}
                                    </div>
                                )}
                            </Grid>
                        ) : null
                    )
                )}
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
