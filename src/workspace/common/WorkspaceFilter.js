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

const useStyles = makeStyles(theme => ({
    root: {
        padding: 16
    },
    title: {
        fontSize: 16,
        marginBottom: 24
    },
    clear: {
        display: 'block',
        marginLeft: 'auto',
        marginTop: 16
    }
}));

const fields = [
    {
        id: "time_range",
        type: "select",
        title: "Time Range",
        options: [
            {
                value: "all_time",
                title: "All Time"
            },
            {
                value: "last_3_months",
                title: "Last 3 Months"
            },
            {
                value: "last_6_months",
                title: "Last 6 Months"
            },
            {
                value: "last_9_months",
                title: "Last 9 Months"
            },
            {
                value: "last_12_months",
                title: "Last 12 Months"
            },
            {
                value: "last_15_months",
                title: "Last 15 Months"
            },
            {
                value: "last_18_months",
                title: "Last 18 Months"
            },
            {
                value: "custom",
                title: "Custom"
            }
        ]
    },
    {
        id: "account_status",
        type: "select",
        title: "Account Status",
        options: [
            {
                value: "all",
                title: "All"
            },
            {
                value: "open",
                title: "Open"
            },
            {
                value: "closed",
                title: "Closed"
            }
        ]
    },
    {
        id: "subscription_status",
        type: "select",
        title: "Subscription Status",
        options: [
            {
                value: "all",
                title: "All"
            },
            {
                value: "active",
                title: "Active"
            },
            {
                value: "renewing",
                title: "Renewing"
            },
            {
                value: "non_renewing",
                title: "Non-renewing"
            },
            {
                value: "future_start_date",
                title: "Future Start Date"
            },
            {
                value: "in_trial",
                title: "In Trial"
            },
            {
                value: "paused",
                title: "Paused"
            },
            {
                value: "past_due",
                title: "Past Due"
            },
            {
                value: "no_subscription",
                title: "No Subscription"
            }
        ]
    }
];

export default function WorkspaceFilter(props) {
    const { range, onValueChange, onClear } = props;
    const classes = useStyles();
    const renderSelect = field => (
        <FormControl
            variant="outlined"
            className={classes.control}
            fullWidth={true}>
            <InputLabel id={field.id}>{field.title}</InputLabel>
            <Select
                labelId={field.id}
                value={field.value}
                onChange={onValueChange}
                label={field.title}>
                {field.options.map(option => (
                    <MenuItem value={option.value}>{option.title}</MenuItem>
                ))}
            </Select>
        </FormControl>)

    return (
        <Paper className={classes.root}>
            <Typography className={classes.title} variant="h6">Filters</Typography>
            <Grid container={true} spacing={3}>
                {
                    fields.map(field => (
                        <Grid item={true} item={true} lg={12}>
                            {(field.type == "select") && renderSelect(field)}
                        </Grid>))
                }
            </Grid>
            <Button
                size="small"
                color="secondary"
                variant="text"
                className={classes.clear}
                onClick={onClear}>
                Clear
            </Button>
        </Paper>
    );
}