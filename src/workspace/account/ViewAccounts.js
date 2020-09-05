import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import WorkspaceTable from "../common/WorkspaceTable";
import WorkspaceToolbar from "../common/WorkspaceToolbar";
import WorkspaceFilter from "../common/WorkspaceFilter";
import NoRecords from "../common/NoRecords";
import { toURLParams, toFilterState } from "../common/WorkspaceFilter";
import * as actions from "../../redux/actions";
import { toDateString } from "../../utils";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/ViewList";
import FilterIcon from "@material-ui/icons/FilterList";
import CompactIcon from "@material-ui/icons/ViewCompact";
import queryString from "query-string";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 16,
    },
}));

const headers = [
    {
        id: "userName",
        numeric: false,
        disablePadding: false,
        label: "User Name",
    },
    {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Name",
    },
    {
        id: "emailAddress",
        numeric: false,
        disablePadding: false,
        label: "Email Address",
    },
    {
        id: "phoneNumber",
        numeric: false,
        disablePadding: false,
        label: "Phone Number",
    },
    {
        id: "created",
        numeric: false,
        disablePadding: false,
        label: "Created",
    },
    /*{
        identifier: "plans",
        numeric: false,
        disablePadding: false,
        label: "Plans",
    },*/
];

const filterFields = [
    {
        identifier: "date_range",
        type: "time_range",
        title: "Time Range",
        startTitle: "Start Date",
        startIdentifier: "start_date",
        endTitle: "End Date",
        endIdentifier: "end_date",
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
            startDate: new Date(),
            endDate: new Date(),
        },
    },
    /*
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
    },*/
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

const DEFAULT_ROWS_PER_PAGE = 20;

/* [TODO]
 * 1. Filter logic
 * 2. Add `accountStatus`` and `subscriptions` fields to the Account entity.
 */
function ViewAccounts(props) {
    const { accounts, fetchAccounts, newAccount, history, location } = props;
    const params = queryString.parse(location.search);
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [openFilter, setOpenFilter] = useState(
        Object.keys(params).length > 0
    );
    const [compact, setCompact] = useState(false);
    const [page, setPage] = useState(parseInt(params.page, 10) || 0);
    const [rowsPerPage, setRowsPerPage] = React.useState(
        params.limit || DEFAULT_ROWS_PER_PAGE
    );
    // TODO: Should we cache this?
    const defaultFilterValues = toFilterState(filterFields, params);
    const [filterValues, setFilterValues] = useState(defaultFilterValues);

    const generateURL = (values, page, rowsPerPage) => {
        const flatValues = toURLParams(filterFields, values);
        const params = new URLSearchParams(flatValues);
        params.append("page", page);
        params.append("limit", rowsPerPage);

        history.push("/accounts?" + params.toString());
    };

    // Both the parameters must appear together. Otherwise, we automatically reset them both.
    if (!("page" in params) || !("limit" in params)) {
        generateURL(filterValues, page, rowsPerPage);
    }

    if ("start_date" in params) {
        params["start_date"] = new Date(Number(params["start_date"]));
    }
    if ("end_date" in params) {
        params["end_date"] = new Date(Number(params["end_date"]));
    }

    const handleAction = (type) => {
        if (type === "new") {
            newAccount();
        } else if (type === "filter") {
            setOpenFilter(!openFilter);
        } else if (type === "compact" || type === "default") {
            setCompact(!compact);
        }
    };

    const onClick = (account) => {
        history.push("/accounts/" + account.id);
    };

    // TODO: Create a deep copy without serializing !
    const onFilterValueChange = (field, value) => {
        const newValues = Object.assign({}, filterValues);
        newValues[field] = value;
        setFilterValues(newValues);

        generateURL(newValues, page, rowsPerPage);
    };

    const onFilterClear = () => {
        const defaultValues = toFilterState(filterFields, {});
        setFilterValues(defaultValues);

        generateURL(defaultValues, page, rowsPerPage);
    };

    const descendingComparator = (accountA, accountB, orderBy) => {
        const keys = {
            userName: "userName",
            name: "firstName",
            emailAddress: "emailAddress",
            phoneNumber: "phoneNumber",
            created: "createdAt",
        };
        const key = keys[orderBy];
        let valueA = accountA[key];
        let valueB = accountB[key];

        if (typeof valueA === "string") {
            valueA = valueA.toLowerCase();
        } else if (valueA instanceof Date) {
            valueA = valueA.getTime();
        }

        if (typeof valueB === "string") {
            valueB = valueB.toLowerCase();
        } else if (valueB instanceof Date) {
            valueB = valueB.getTime();
        }

        return valueB < valueA ? -1 : valueB > valueA ? 1 : 0;
    };

    const renderCellValue = (row, rowIndex, column, columnIndex) => {
        switch (column.id) {
            case "userName": {
                return row.userName;
            }

            case "name": {
                return row.firstName + " " + row.lastName;
            }

            case "emailAddress": {
                return row.emailAddress ? row.emailAddress : "—";
            }

            case "phoneNumber": {
                return row.phoneNumber ? row.phoneNumber : "—";
            }

            case "created": {
                return toDateString(row.createdAt);
            }

            /*
            case "plans": {
                return "TODO";
            }*/

            default: {
                return "Unknown Column";
            }
        }
    };

    const onChangePage = (newPage) => {
        setPage(newPage);
        generateURL(filterValues, newPage, rowsPerPage);
    };

    const onChangeRowsPerPage = (newRowsPerPage) => {
        setPage(0);
        setRowsPerPage(newRowsPerPage);
        generateURL(filterValues, 0, newRowsPerPage);
    };

    useEffect(() => {
        console.log(filterFields, filterValues);
        const flatValues = toURLParams(filterFields, filterValues);
        flatValues.page = page;
        flatValues.limit = rowsPerPage;
        fetchAccounts(flatValues);
    }, [fetchAccounts, filterValues, page, rowsPerPage]);

    return (
        <div>
            <WorkspaceToolbar
                title="Accounts"
                selectionCount={selected.length}
                actions={compact ? actions1 : actions2}
                onAction={handleAction}
            />
            {accounts && accounts.records.length > 0 && (
                <Grid container={true} className={classes.container}>
                    <Grid item={true} lg={openFilter ? 10 : 12}>
                        <WorkspaceTable
                            headers={headers}
                            onSelected={setSelected}
                            selected={selected}
                            compact={compact}
                            onClick={onClick}
                            renderCellValue={renderCellValue}
                            rows={accounts.records}
                            totalRows={accounts.totalRecords}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onChangePage={onChangePage}
                            onChangeRowsPerPage={onChangeRowsPerPage}
                            descendingComparator={descendingComparator}
                        />
                    </Grid>
                    {openFilter && (
                        <Grid item={true} lg={2} className={classes.filter}>
                            <WorkspaceFilter
                                fields={filterFields}
                                values={filterValues}
                                onValueChange={onFilterValueChange}
                                onClear={onFilterClear}
                            />
                        </Grid>
                    )}
                </Grid>
            )}

            {(!accounts || accounts.records.length === 0) && (
                <NoRecords
                    message="You have not created any accounts yet."
                    action={true}
                    actionText="Create Account"
                    actionHandler={newAccount}
                    image="assets/images/empty-accounts.svg"
                />
            )}
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewAccounts));
