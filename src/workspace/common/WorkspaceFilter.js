import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 16,
        marginLeft: 16,
    },
    title: {
        fontSize: 16,
        marginBottom: 24,
    },
    clear: {
        display: "block",
        marginLeft: "auto",
        marginTop: 16,
    },
    datePicker: {
        marginTop: theme.spacing(3),
        marginBottom: 0,
    },
}));

export function extractFilterState(fields) {
    const result = {};
    fields.forEach(
        (field) =>
            (result[field.identifier] = JSON.parse(
                JSON.stringify(field.defaultValue)
            ))
    );
    return result;
}

export function toURLParams(fields, values) {
    console.log(values);

    const result = {};
    fields.forEach((field) => {
        if (field.type === "time_range") {
            result[field.identifier] = values[field.identifier].option;
            if (values[field.identifier].option === "custom") {
                result[field.startIdentifier] = values[
                    field.identifier
                ].startDate.getTime();
                result[field.endIdentifier] = values[
                    field.identifier
                ].endDate.getTime();
            }
        } else {
            result[field.identifier] = values[field.identifier];
        }
    });
    console.log(result);
    return result;
}

export function toFilterState(fields, params) {
    const result = {};
    fields.forEach((field) => {
        if (field.type === "time_range") {
            result[field.identifier] = {};

            if (field.identifier in params) {
                result[field.identifier].option = params[field.identifier];
            } else {
                result[field.identifier].option = field.defaultValue.option;
            }

            if (field.startIdentifier in params) {
                result[field.identifier].startDate =
                    params[field.startIdentifier];
            } else {
                result[field.identifier].startDate =
                    field.defaultValue.startDate;
            }

            if (field.endIdentifier in params) {
                result[field.identifier].endDate = params[field.endIdentifier];
            } else {
                result[field.identifier].endDate = field.defaultValue.endDate;
            }
        } else {
            if (field.identifier in params) {
                result[field.identifier] = params[field.identifier];
            } else {
                result[field.identifier] = field.defaultValue;
            }
        }
    });
    return result;
}

export default function WorkspaceFilter(props) {
    const { fields, values, onValueChange, onClear } = props;
    const classes = useStyles();
    const makeChangeHandler = (field) => (event) => {
        onValueChange(field, event.target.value);
    };
    const makeTimeRangeHandler = (field) => (event) => {
        const newValue = Object.assign({}, values[field]);
        newValue.option = event.target.value;
        onValueChange(field, newValue);
    };
    const makeDateChangeHandler = (field, which) => (date) => {
        const newValue = Object.assign({}, values[field.identifier]);
        // ISO format
        newValue[which] = date; // format(date, "yyyy/MM/dd");
        onValueChange(field.identifier, newValue);
    };

    const renderSelect = (field, value) => (
        <FormControl
            variant="outlined"
            className={classes.control}
            fullWidth={true}
        >
            <InputLabel id={field.identifier}>{field.title}</InputLabel>
            <Select
                labelId={field.identifier}
                value={value}
                onChange={makeChangeHandler(field.identifier)}
                label={field.title}
            >
                {field.options.map((option) => (
                    <MenuItem value={option.value}>{option.title}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    const renderTimeRange = (field, value) => (
        <div>
            <FormControl
                variant="outlined"
                className={classes.control}
                fullWidth={true}
            >
                <InputLabel id={field.identifier}>{field.title}</InputLabel>
                <Select
                    labelId={field.identifier}
                    value={value.option}
                    onChange={makeTimeRangeHandler(field.identifier)}
                    label={field.title}
                >
                    {field.options.map((option) => (
                        <MenuItem value={option.value}>{option.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {value.option === "custom" && (
                <React.Fragment>
                    <KeyboardDatePicker
                        margin="normal"
                        id={field.identifier + "Start"}
                        label={field.startTitle}
                        format="MM/dd/yyyy"
                        inputVariant="outlined"
                        fullWidth={true}
                        value={
                            value.startDate === null
                                ? new Date()
                                : new Date(value.startDate)
                        }
                        onChange={makeDateChangeHandler(field, "startDate")}
                        className={classes.datePicker}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id={field.identifier + "End"}
                        label={field.endTitle}
                        format="MM/dd/yyyy"
                        inputVariant="outlined"
                        fullWidth={true}
                        value={
                            value.endDate === null
                                ? new Date()
                                : new Date(value.endDate)
                        }
                        onChange={makeDateChangeHandler(field, "endDate")}
                        className={classes.datePicker}
                    />
                </React.Fragment>
            )}
        </div>
    );

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Paper className={classes.root}>
                <Typography className={classes.title} variant="h6">
                    Filters
                </Typography>
                <Grid container={true} spacing={3}>
                    {fields.map((field) => (
                        <Grid item={true} lg={12}>
                            {field.type === "select" &&
                                renderSelect(field, values[field.identifier])}

                            {field.type === "time_range" &&
                                renderTimeRange(
                                    field,
                                    values[field.identifier]
                                )}
                        </Grid>
                    ))}
                </Grid>
                <Button
                    size="small"
                    color="secondary"
                    variant="text"
                    className={classes.clear}
                    onClick={onClear}
                >
                    Clear
                </Button>
            </Paper>
        </MuiPickersUtilsProvider>
    );
}
