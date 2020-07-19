import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import WorkspaceTable from "../common/WorkspaceTable";
import WorkspaceToolbar from "../common/WorkspaceToolbar";
import WorkspaceFilter from "../common/WorkspaceFilter";
import { extractFilterState } from "../common/WorkspaceFilter";
import * as actions from "../../redux/actions";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/ViewList";
import FilterIcon from "@material-ui/icons/FilterList";
import CompactIcon from "@material-ui/icons/ViewCompact";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 16,
    },
}));

const headers = [
    { identifier: "name", numeric: false, disablePadding: true, label: "Name" },
    {
        identifier: "email",
        numeric: false,
        disablePadding: false,
        label: "Email",
    },
    {
        identifier: "company",
        numeric: false,
        disablePadding: false,
        label: "Company",
    },
    {
        identifier: "created",
        numeric: false,
        disablePadding: false,
        label: "Created",
    },
    {
        identifier: "plans",
        numeric: false,
        disablePadding: false,
        label: "Plans",
    },
];

const filterFields = [
    {
        identifier: "time_range",
        type: "time_range",
        title: "Time Range",
        startTitle: "Start Date",
        endTitle: "End Date",
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
        defaultValue: {
            option: "all_time",
            startDate: null,
            endDate: null,
        },
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

const actions1 = [
    {
        identifier: "new",
        title: "New",
        icon: AddIcon,
        primary: true,
    },
    {
        identifier: "filter",
        title: "Filter",
        icon: FilterIcon,
        primary: true,
    },
    {
        identifier: "default",
        title: "Default",
        icon: ListIcon,
        primary: true,
    },
    {
        identifier: "delete",
        title: "Delete",
        icon: DeleteIcon,
        primary: false,
    },
];

const actions2 = [
    {
        identifier: "new",
        title: "New",
        icon: AddIcon,
        primary: true,
    },
    {
        identifier: "filter",
        title: "Filter",
        icon: FilterIcon,
        primary: true,
    },
    {
        identifier: "compact",
        title: "Compact",
        icon: CompactIcon,
        primary: true,
    },
    {
        identifier: "delete",
        title: "Delete",
        icon: DeleteIcon,
        primary: false,
    },
];

/* [TODO]
 * 1. Filter logic
 * 2. Add `accountStatus`` and `subscriptions` fields to the Account entity.
 */
function ViewAccounts(props) {
    const { accounts, fetchAccounts, newAccount } = props;
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    const [compact, setCompact] = useState(false);

    // TODO: Should we cache this?
    const defaultFilterValues = extractFilterState(filterFields);
    const [filterValues, setFilterValues] = useState(defaultFilterValues);

    const handleAction = (type) => {
        if (type === "new") {
            newAccount();
        } else if (type === "filter") {
            setOpenFilter(!openFilter);
        } else if (type === "compact" || type === "default") {
            setCompact(!compact);
        }
    };

    // TODO: Create a deep copy without serializing !
    const onFilterValueChange = (field, value) => {
        const newValues = Object.assign({}, filterValues);
        newValues[field] = value;
        setFilterValues(newValues);

        console.log(newValues);
    };

    const onFilterClear = () => {
        const defaultValues = extractFilterState(filterFields);
        setFilterValues(defaultValues);
    };

    useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);

    return (
        <div>
            <WorkspaceToolbar
                title="Accounts"
                selectionCount={selected.length}
                actions={compact ? actions1 : actions2}
                onAction={handleAction}
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
