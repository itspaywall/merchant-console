/* eslint-disable no-use-before-define */

import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    option: {},
});

export default function Lookup(props) {
    const {
        label,
        options,
        updateOptions,
        value,
        onChange,
        renderOption,
        renderOptionLabel,
        name,
        required,
    } = props;
    const classes = useStyles();
    const [inputValue, setInputValue] = React.useState("");

    return (
        <Autocomplete
            fullWidth={true}
            options={options}
            classes={{
                option: classes.option,
            }}
            autoHighlight={true}
            getOptionLabel={renderOptionLabel}
            renderOption={renderOption}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete:
                            "new-password" /* Disable autocomplete and autofill */,
                    }}
                    required={required}
                    name={name}
                />
            )}
            onInputChange={(event, inputValue, reason) => {
                if (reason === "input") {
                    // Convert empty strings to null.
                    updateOptions(inputValue ? inputValue : null);
                }
                setInputValue(inputValue);
            }}
            inputValue={inputValue}
            onChange={onChange}
            value={value}
        />
    );
}
