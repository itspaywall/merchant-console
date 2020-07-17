import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
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

export default function RecordForm(props) {
    const { values, groups, showMore, onValueChange } = props;
    const classes = useStyles(props);
    const [tabIndex, setTabIndex] = React.useState(0);

    const makeChangeHandler = (group, field) => (event) => {
        onValueChange(group, field, event.target.value);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container={true} spacing={2}>
                {showMore && (
                    <Grid item={true} lg={4}>
                        <List component="nav">
                            {groups.map((group, groupIndex) => (
                                <ListItem
                                    key={group.identifier}
                                    button={true}
                                    selected={tabIndex === groupIndex}
                                    onClick={() => setTabIndex(groupIndex)}
                                >
                                    <ListItemText
                                        primary={group.label}
                                        className={classes.tabText}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                )}
                <Grid item={true} lg={showMore ? 8 : 12}>
                    <Grid container={true} spacing={2}>
                        {groups.map((group, groupIndex) =>
                            group.children.map((field, fieldIndex) =>
                                (!showMore && field.quickAdd) ||
                                (showMore && groupIndex === tabIndex) ? (
                                    <Grid
                                        key={field.identifier}
                                        item={true}
                                        lg={12}
                                    >
                                        {field.type !== "date" && (
                                            <TextField
                                                className={
                                                    fieldIndex > 0
                                                        ? "mt-8"
                                                        : "mt-0"
                                                }
                                                label={field.label}
                                                id={field.identifier}
                                                name={field.identifier}
                                                type="text"
                                                variant="outlined"
                                                fullWidth={true}
                                                required={field.required}
                                                value={
                                                    values[groupIndex][
                                                        fieldIndex
                                                    ].value
                                                }
                                                onChange={makeChangeHandler(
                                                    groupIndex,
                                                    fieldIndex
                                                )}
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
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
