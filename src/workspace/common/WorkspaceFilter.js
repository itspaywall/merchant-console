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

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 16,
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
}));

export function extractFilterState(fields) {
    const result = {};
    fields.forEach(field => (result[field.identifier] = field.defaultValue));
    return result;
}

export default function WorkspaceFilter(props) {
    const { fields, values, onValueChange, onClear } = props;
    const classes = useStyles();
    const makeChangeHandler = field => event => {
        onValueChange(field, event.target.value);
    }

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

    return (
        <Paper className={classes.root}>
            <Typography className={classes.title} variant="h6">
                Filters
            </Typography>
            <Grid container={true} spacing={3}>
                {fields.map((field) => (
                    <Grid item={true} lg={12}>
                        {(field.type === "select") && renderSelect(field, values[field.identifier])}
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
    );
}
