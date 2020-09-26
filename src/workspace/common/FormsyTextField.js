import React from "react";
import { TextField } from "@material-ui/core";
import { withFormsy } from "formsy-react";

function FormsyTextField(props) {
    const errorMessage = props.errorMessage;
    const value = props.value || "";

    const changeValue = (event) => {
        props.setValue(event.currentTarget.value);
        if (props.onChange) {
            props.onChange(event);
        }
    };

    return (
        <TextField
            {...props}
            onChange={changeValue}
            value={value}
            error={Boolean(errorMessage)}
            helperText={errorMessage}
        />
    );
}

export default withFormsy(FormsyTextField);
