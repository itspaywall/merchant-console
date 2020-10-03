/* eslint-disable no-use-before-define */

import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { withFormsy } from "formsy-react";
import { data as countries } from "../../common/countries";

/* ISO 3166-1 alpha-2
 * ⚠️ No support for IE 11
 */
function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== "undefined"
        ? isoCode
              .toUpperCase()
              .replace(/./g, (character) =>
                  String.fromCodePoint(character.charCodeAt(0) + 127397)
              )
        : isoCode;
}

const useStyles = makeStyles({
    option: {
        fontSize: 16,
        "& > span": {
            marginRight: 8,
            fontSize: 18,
        },
    },
});

function CountrySelect(props) {
    const { fullWidth, label, required, onChange, value } = props;
    const classes = useStyles();

    return (
        <Autocomplete
            fullWidth={fullWidth}
            required={required}
            options={countries}
            classes={{
                option: classes.option,
            }}
            autoHighlight={true}
            getOptionLabel={(option) => option.label}
            renderOption={(option) => (
                <React.Fragment>
                    <span>{countryToFlag(option.code)}</span>
                    {option.label}
                </React.Fragment>
            )}
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
                />
            )}
            onChange={onChange}
            value={value}
        />
    );
}

export default withFormsy(CountrySelect);
