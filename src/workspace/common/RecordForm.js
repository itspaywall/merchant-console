import React, { useState } from "react";
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
    KeyboardTimePicker,
    KeyboardDateTimePicker,
} from "@material-ui/pickers";
import Chip from "@material-ui/core/Chip";
import CountrySelect from "./CountrySelect";
import Lookup from "./Lookup";
import FormsyTextField from "./FormsyTextField";
import { newClient } from "../../server/api";
import Formsy from "formsy-react";

const client = newClient();
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        paddingRight: 16,
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
        width: "100%",
        maginLeft: 16,
        marginRight: 16,
        marginBottom: 20,
    },
}));

// const options = [{ firstName: "Hello", lastName: "World", userName: "hello" }];

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

const apis = {
    account_lookup: client.getAccounts,
    plan_lookup: client.getPlans,
};

function prepareLookupContexts(groups) {
    const result = {};
    groups.forEach((group) => {
        group.children.forEach((field) => {
            if (field.type in apis) {
                const context = {
                    updateOptions: async function (field, text) {
                        if (text) {
                            const api = apis[field.type];
                            const response = await api({
                                search: text,
                            });
                            this.setOptions(response.data.records);
                        } else {
                            this.setOptions([]);
                        }
                    },
                };
                const [options, setOptions] = useState([]);
                context.options = options;
                context.setOptions = setOptions;
                result[field.identifier] = context;
            }
        });
    });
    return result;
}

export default function RecordForm(props) {
    const {
        values,
        groups,
        showMore,
        onValueChange,
        tabIndex,
        onValidityChange,
    } = props;
    const classes = useStyles(props);
    const contexts = prepareLookupContexts(groups);

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

    const makeLookupChangeHandler = (field) => (event, value) => {
        onValueChange(field, value ? Object.assign({}, value) : null);
    };

    const renderSelect = (field) => (
        <FormControl
            variant="outlined"
            fullWidth={true}
            size="medium"
            required={field.required}
        >
            <InputLabel id={field.identifier}>{field.label}</InputLabel>
            <Select
                labelId={field.identifier}
                value={values[field.identifier]}
                onChange={makeChangeHandler(field)}
                label={field.label}
                name={field.identifier}
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
                name={field.identifier}
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
            <Grid container={true}>
                <Formsy
                    onValid={() => onValidityChange(false)}
                    onInvalid={() => onValidityChange(true)}
                    className={classes.root}
                >
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
                                        <FormsyTextField
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
                                            validations={field.validations}
                                            validationErrors={
                                                field.validationErrors
                                            }
                                            preventFirstValidation={true}
                                        />
                                    )}

                                    {field.type === "password" && (
                                        <FormsyTextField
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
                                            validations={field.validations}
                                            validationErrors={
                                                field.validationErrors
                                            }
                                            preventFirstValidation={true}
                                        />
                                    )}

                                    {field.type === "large_text" && (
                                        <FormsyTextField
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
                                            validations={field.validations}
                                            validationErrors={
                                                field.validationErrors
                                            }
                                            preventFirstValidation={true}
                                        />
                                    )}

                                    {field.type === "number" && (
                                        <FormsyTextField
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
                                            validations={field.validations}
                                            validationErrors={
                                                field.validationErrors
                                            }
                                            preventFirstValidation={true}
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
                                                          values[
                                                              field.identifier
                                                          ]
                                                      )
                                            }
                                            onChange={(value) =>
                                                onValueChange(field, value)
                                            }
                                            size="medium"
                                        />
                                    )}

                                    {field.type === "time" && (
                                        <KeyboardTimePicker
                                            id={field.identifier}
                                            label={field.label}
                                            name={field.identifier}
                                            fullWidth={true}
                                            inputVariant="outlined"
                                            required={field.required}
                                            value={
                                                !values[field.identifier]
                                                    ? new Date()
                                                    : new Date(
                                                          values[
                                                              field.identifier
                                                          ]
                                                      )
                                            }
                                            onChange={(value) =>
                                                onValueChange(field, value)
                                            }
                                            size="medium"
                                        />
                                    )}

                                    {field.type === "date_time" && (
                                        <KeyboardDateTimePicker
                                            id={field.identifier}
                                            label={field.label}
                                            name={field.identifier}
                                            fullWidth={true}
                                            inputVariant="outlined"
                                            required={field.required}
                                            value={
                                                !values[field.identifier]
                                                    ? new Date()
                                                    : new Date(
                                                          values[
                                                              field.identifier
                                                          ]
                                                      )
                                            }
                                            onChange={(value) =>
                                                onValueChange(field, value)
                                            }
                                            size="medium"
                                            format="MM/dd/yyyy, hh:mm a"
                                        />
                                    )}

                                    {field.type === "switch" && (
                                        <FormGroup>
                                            <FormControlLabel
                                                id={field.identifier}
                                                label={field.label}
                                                name={field.identifier}
                                                control={
                                                    <Switch color="primary" />
                                                }
                                                required={field.required}
                                                value={values[field.identifier]}
                                                onChange={makeChangeHandler(
                                                    field
                                                )}
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
                                                <InputLabel
                                                    id={field.identifier}
                                                >
                                                    {field.title}
                                                </InputLabel>
                                                <Select
                                                    name={field.identifier}
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
                                                    {field.options.map(
                                                        (option) => (
                                                            <MenuItem
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.title}
                                                            </MenuItem>
                                                        )
                                                    )}
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
                                                        name={
                                                            field.identifier +
                                                            "Start"
                                                        }
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
                                                        name={
                                                            field.identifier +
                                                            "End"
                                                        }
                                                        id={
                                                            field.identifier +
                                                            "End"
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

                                    {field.type === "select" &&
                                        renderSelect(field)}

                                    {field.type === "multi_select" &&
                                        renderMultiSelect(field)}

                                    {field.type === "email_address" && (
                                        <FormsyTextField
                                            id={field.identifier}
                                            label={field.label}
                                            name={field.identifier}
                                            type="text"
                                            fullWidth={true}
                                            variant="outlined"
                                            required={field.required}
                                            value={values[field.identifier]}
                                            onChange={makeChangeHandler(field)}
                                            validations={field.validations}
                                            validationErrors={
                                                field.validationErrors
                                            }
                                            size="medium"
                                        />
                                    )}

                                    {field.type === "phone_number" && (
                                        <FormsyTextField
                                            id={field.identifier}
                                            label={field.label}
                                            name={field.identifier}
                                            type="text"
                                            fullWidth={true}
                                            variant="outlined"
                                            required={field.required}
                                            value={values[field.identifier]}
                                            onChange={makeChangeHandler(field)}
                                            validations={field.validations}
                                            validationErrors={
                                                field.validationErrors
                                            }
                                            size="medium"
                                            preventFirstValidation={true}
                                        />
                                    )}

                                    {field.type === "country" && (
                                        <CountrySelect
                                            id={field.identifier}
                                            label={field.label}
                                            name={field.identifier}
                                            fullWidth={true}
                                            required={field.required}
                                            value={values[field.identifier]}
                                            onChange={makeLookupChangeHandler(
                                                field
                                            )}
                                            validations={field.validations}
                                            validationErrors={
                                                field.validationErrors
                                            }
                                            size="medium"
                                            preventFirstValidation={true}
                                        />
                                    )}

                                    {field.type === "account_lookup" && (
                                        <Lookup
                                            label={field.label}
                                            options={
                                                contexts[field.identifier]
                                                    .options
                                            }
                                            updateOptions={(searchText) =>
                                                contexts[
                                                    field.identifier
                                                ].updateOptions(
                                                    field,
                                                    searchText
                                                )
                                            }
                                            onChange={makeLookupChangeHandler(
                                                field
                                            )}
                                            value={values[field.identifier]}
                                            renderOptionLabel={(option) =>
                                                `${option.userName}`
                                            }
                                            renderOption={(option) => (
                                                <React.Fragment>
                                                    {`${option.userName} • ${option.firstName} ${option.lastName}`}
                                                </React.Fragment>
                                            )}
                                            name={field.identifier}
                                            required={field.required}
                                        />
                                    )}

                                    {field.type === "plan_lookup" && (
                                        <Lookup
                                            label={field.label}
                                            options={
                                                contexts[field.identifier]
                                                    .options
                                            }
                                            updateOptions={(searchText) =>
                                                contexts[
                                                    field.identifier
                                                ].updateOptions(
                                                    field,
                                                    searchText
                                                )
                                            }
                                            onChange={makeLookupChangeHandler(
                                                field
                                            )}
                                            value={values[field.identifier]}
                                            renderOptionLabel={(option) =>
                                                `${option.name}`
                                            }
                                            renderOption={(option) => (
                                                <React.Fragment>
                                                    {`${option.code} • ${option.name}`}
                                                </React.Fragment>
                                            )}
                                            name={field.identifier}
                                            required={field.required}
                                        />
                                    )}
                                </Grid>
                            ) : null
                        )
                    )}
                </Formsy>
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
