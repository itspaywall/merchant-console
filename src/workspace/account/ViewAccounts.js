import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import WorkspaceTable from "../common/WorkspaceTable";
import WorkspaceTableToolbar from "../common/WorkspaceTableToolbar";
import WorkspaceFilter from "../common/WorkspaceFilter";
import { extractFilterState } from "../common/WorkspaceFilter";
import * as actions from "../../actions";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 16,
    },
}));

const headers = [
    { identifier: "name", numeric: false, disablePadding: true, label: "Name" },
    { identifier: "email", numeric: false, disablePadding: false, label: "Email" },
    { identifier: "company", numeric: false, disablePadding: false, label: "Company" },
    { identifier: "created", numeric: false, disablePadding: false, label: "Created" },
    { identifier: "plans", numeric: false, disablePadding: false, label: "Plans" },
];

const filterFields = [
    {
        identifier: "time_range",
        type: "select",
        title: "Time Range",
        options: [
            {
                value: "all_time",
                title: "All Time",
            },
            {
                value: "last_3_months",
                title: "Last 3 Months",
            },
            {
                value: "last_6_months",
                title: "Last 6 Months",
            },
            {
                value: "last_9_months",
                title: "Last 9 Months",
            },
            {
                value: "last_12_months",
                title: "Last 12 Months",
            },
            {
                value: "last_15_months",
                title: "Last 15 Months",
            },
            {
                value: "last_18_months",
                title: "Last 18 Months",
            },
            {
                value: "custom",
                title: "Custom",
            },
        ],
        defaultValue: "all_time",
    },
    {
        identifier: "account_status",
        type: "select",
        title: "Account Status",
        options: [
            {
                value: "all",
                title: "All",
            },
            {
                value: "open",
                title: "Open",
            },
            {
                value: "closed",
                title: "Closed",
            },
        ],
        defaultValue: "all",
    },
    {
        identifier: "subscription_status",
        type: "select",
        title: "Subscription Status",
        options: [
            {
                value: "all",
                title: "All",
            },
            {
                value: "active",
                title: "Active",
            },
            {
                value: "renewing",
                title: "Renewing",
            },
            {
                value: "non_renewing",
                title: "Non-renewing",
            },
            {
                value: "future_start_date",
                title: "Future Start Date",
            },
            {
                value: "in_trial",
                title: "In Trial",
            },
            {
                value: "paused",
                title: "Paused",
            },
            {
                value: "past_due",
                title: "Past Due",
            },
            {
                value: "no_subscription",
                title: "No Subscription",
            },
        ],
        defaultValue: "all",
    },
];

function ViewAccounts(props) {
    const { accounts, fetchAccounts, newAccount } = props;
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    const [compact, setCompact] = useState(false);
    
    // TODO: Should we cache this?
    const defaultFilterValues = extractFilterState(filterFields);
    const [filterValues, setFilterValues] = useState(defaultFilterValues);
    console.log(defaultFilterValues);

    const toggleFilter = () => {
        setOpenFilter(!openFilter);
    };
    const toggleCompact = () => {
        setCompact(!compact);
    };

    // TODO: Create a deep copy without serializing !
    const onFilterValueChange = (field, value) => {
        const newValues = Object.assign({}, filterValues);
        newValues[field] = value;
        setFilterValues(newValues);
    };

    const onFilterClear = () => {
        const defaultValues = extractFilterState(filterFields);
        setFilterValues(defaultValues);
        console.log(defaultValues);
    };

    useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);

    return (
        <div>
            <WorkspaceTableToolbar
                title="Accounts"
                selectionCount={selected.length}
                toggleCompact={toggleCompact}
                toggleFilter={toggleFilter}
                onNew={newAccount}
                compact={compact}
            />
            <Grid container={true} className={classes.container} spacing={2}>
                <Grid item={true} lg={openFilter ? 10 : 12}>
                    <WorkspaceTable
                        headers={headers}
                        onSelected={setSelected}
                        rows={accounts}
                        selected={selected}
                        compact={compact}
                    />
                </Grid>
                {openFilter && (
                    <Grid item={true} lg={2}>
                        <WorkspaceFilter
                            fields={filterFields}
                            values={filterValues}
                            onValueChange={onFilterValueChange}
                            onClear={onFilterClear}
                        />
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        accounts: state.accounts,
    };
}

const mapDispatchToProps = {
    fetchAccounts: actions.fetchAccounts,
    newAccount: actions.newAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAccounts);
