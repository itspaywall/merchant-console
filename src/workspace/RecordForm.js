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
import Chip from "@material-ui/core/Chip";

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
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: 2,
    },
    field: {
        marginTop: 20,
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
        group.children.forEach((field) => {
            if (field.type === "date_range") {
                result[field.identifier] = {
                    option: field.defaultValue.option,
                    startDate: field.defaultValue.startDate,
                    endDate: field.defaultValue.endDate,
                };
            } else if (field.type === "multi_select") {
                result[field.identifier] = [...field.defaultValue];
            } else {
                result[field.identifier] = field.defaultValue;
            }
        });
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

    const validateEmail = (field) => {
        const value = values[field.identifier].toLowerCase();
        // eslint-disable-next-line
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !value || pattern.test(value);
    };

    const validatePhoneNumber = (field) => {
        // eslint-disable-next-line
        // const pattern = /^([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}$/;
        return true;
    };

    const renderSelect = (field) => (
        <FormControl variant="outlined" fullWidth={true} size="medium">
            <InputLabel id={field.identifier}>{field.label}</InputLabel>
            <Select
                labelId={field.identifier}
                value={values[field.identifier]}
                onChange={makeChangeHandler(field)}
                label={field.label}
            >
                {field.options.map((option) => (
                    <MenuItem value={option.value}>{option.title}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    const getSelectedTitle = (field, selected) => {
        return field.options.find((option) => option.value === selected).title;
    };

    const renderMultiSelect = (field) => (
        <FormControl variant="outlined" fullWidth={true} size="medium">
            <InputLabel id={field.identifier}>{field.label}</InputLabel>
            <Select
                labelId={field.identifier}
                value={values[field.identifier]}
                multiple={true}
                onChange={makeChangeHandler(field)}
                label={field.label}
                renderValue={(selected) => (
                    <div>
                        {selected.map((value) => (
                            <Chip
                                value={selected}
                                label={getSelectedTitle(field, value)}
                            />
                        ))}
                    </div>
                )}
            >
                {field.options.map((option) => (
                    <MenuItem value={option.value}>{option.title}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container={true} className={classes.root}>
                {groups.map((group, groupIndex) =>
                    group.children.map((field, fieldIndex) =>
                        (!showMore && field.quickAdd) ||
                        (showMore && groupIndex === tabIndex) ? (
                            <Grid
                                key={field.identifier}
                                item={true}
                                lg={12}
                                className={classes.field}
                            >
                                {field.type === "text" && (
                                    <TextField
                                        label={field.label}
                                        id={field.identifier}
                                        name={field.identifier}
                                        type="text"
                                        variant="outlined"
                                        fullWidth={true}
                                        required={field.required}
                                        value={values[field.identifier]}
                                        onChange={makeChangeHandler(field)}
                                        size="medium"
                                    />
                                )}

                                {field.type === "password" && (
                                    <TextField
                                        label={field.label}
                                        id={field.identifier}
                                        name={field.identifier}
                                        type="password"
                                        variant="outlined"
                                        fullWidth={true}
                                        required={field.required}
                                        value={values[field.identifier]}
                                        onChange={makeChangeHandler(field)}
                                        size="medium"
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
                                        size="medium"
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
                                        size="medium"
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
                                        size="medium"
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
                                    </FormGroup>
                                )}

                                {field.type === "date_range" && (
                                    <div>
                                        <FormControl
                                            variant="outlined"
                                            fullWidth={true}
                                            size="medium"
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
                                                    size="medium"
                                                    value={
                                                        !values[
                                                            field.identifier
                                                        ].startDate
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
                                                    size="medium"
                                                    value={
                                                        !values[
                                                            field.identifier
                                                        ].endDate
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

                                {field.type === "select" && renderSelect(field)}

                                {field.type === "multi_select" &&
                                    renderMultiSelect(field)}

                                {field.type === "email_address" && (
                                    <TextField
                                        id={field.identifier}
                                        label={field.label}
                                        name={field.identifier}
                                        type="text"
                                        fullWidth={true}
                                        variant="outlined"
                                        required={field.required}
                                        value={values[field.identifier]}
                                        onChange={makeChangeHandler(field)}
                                        error={!validateEmail(field)}
                                        helperText={
                                            validateEmail(field)
                                                ? ""
                                                : "Please specify a valid email address."
                                        }
                                        size="medium"
                                    />
                                )}

                                {field.type === "phone_number" && (
                                    <TextField
                                        id={field.identifier}
                                        label={field.label}
                                        name={field.identifier}
                                        type="text"
                                        fullWidth={true}
                                        variant="outlined"
                                        required={field.required}
                                        value={values[field.identifier]}
                                        onChange={makeChangeHandler(field)}
                                        error={!validatePhoneNumber(field)}
                                        helperText={
                                            validatePhoneNumber(field)
                                                ? ""
                                                : "Please specify a valid phone number."
                                        }
                                        size="medium"
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
