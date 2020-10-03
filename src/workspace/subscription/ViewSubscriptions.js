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
        identifier: "name",
        numeric: false,
        disablePadding: false,
        label: "Name",
    },
    {
        identifier: "plan",
        numeric: false,
        disablePadding: false,
        label: "Plan",
    },
    {
        identifier: "quantity",
        numeric: false,
        disablePadding: false,
        label: "Quantity",
    },
    {
        identifier: "status",
        numeric: false,
        disablePadding: false,
        label: "Status",
    },
    {
        identifier: "created",
        numeric: false,
        disablePadding: false,
        label: "Created",
    },
    /*{
        identifier: "nextInvoice",
        numeric: false,
        disablePadding: false,
        label: "Next Invoice",
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
    /*{
        // TODO: Change type to switch.
        identifier: "trial_status",
        type: "select",
        title: "Trial Status",
        options: [
            {
                value: "all",
                title: "All",
            },
            {
                value: "in_trial",
                title: "In Trial",
            },
            {
                value: "not_in_trial",
                title: "Not In Trial",
            },
        ],
        defaultValue: "all",
    },*/
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
                value: "new",
                title: "New",
            },
            {
                value: "future",
                title: "Future",
            },
            {
                value: "in_trial",
                title: "In Trial",
            },
            {
                value: "active",
                title: "Active",
            },
            {
                value: "pending",
                title: "Pending",
            },
            {
                value: "halted",
                title: "Halted",
            },
            {
                value: "canceled",
                title: "Canceled",
            },
            {
                value: "expired",
                title: "Expired",
            },
            {
                value: "paused",
                title: "Paused",
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

const statuses = {
    new: "New",
    future: "Future",
    in_trial: "In Trial",
    active: "Active",
    pending: "Pending",
    halted: "Halted",
    canceled: "Canceled",
    expired: "Expired",
    paused: "Paused",
};

const DEFAULT_ROWS_PER_PAGE = 20;

/* [TODO]
 * 1. Filter logic
 */
function ViewSubscriptions(props) {
    const {
        subscriptions,
        fetchSubscriptions,
        newSubscription,
        history,
        location,
    } = props;
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

        history.push("/subscriptions?" + params.toString());
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
            newSubscription();
        } else if (type === "filter") {
            setOpenFilter(!openFilter);
        } else if (type === "compact" || type === "default") {
            setCompact(!compact);
        }
    };

    const onClick = (subscription) => {
        history.push("/subscriptions/" + subscription.id);
    };

    // TODO: Create a deep copy without serializing!
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
        let valueA;
        let valueB;
        switch (orderBy) {
            case "plan": {
                valueA = accountA.plan.name.toLowerCase();
                valueB = accountB.plan.name.toLowerCase();
                break;
            }

            case "name": {
                valueA = (
                    accountA.account.firstName + accountA.account.lastName
                ).toLowerCase();
                valueB = (
                    accountB.account.firstName + accountB.account.lastName
                ).toLowerCase();
                break;
            }

            case "createdAt": {
                valueA = accountA.createdAt.getTime();
                valueB = accountB.createdAt.getTime();
                break;
            }

            default: {
                valueA = accountA[orderBy];
                valueB = accountB[orderBy];
                break;
            }
        }

        return valueB < valueA ? -1 : valueB > valueA ? 1 : 0;
    };

    const renderCellValue = (row, rowIndex, column, columnIndex) => {
        switch (column.identifier) {
            case "plan": {
                return row.plan.name;
            }

            case "name": {
                return row.account.firstName + " " + row.account.lastName;
            }

            case "quantity": {
                return row.quantity;
            }

            case "created": {
                return toDateString(row.createdAt);
            }

            case "status": {
                return statuses[row.status];
            }

            case "nextInvoice": {
                return "TODO";
            }

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
        fetchSubscriptions(flatValues);
    }, [fetchSubscriptions, filterValues, page, rowsPerPage]);

    return (
        <div>
            <WorkspaceToolbar
                title="Subscriptions"
                selectionCount={selected.length}
                actions={compact ? actions1 : actions2}
                onAction={handleAction}
            />
            <Grid container={true} className={classes.container}>
                <Grid item={true} lg={openFilter ? 10 : 12}>
                    {subscriptions && subscriptions.records.length > 0 && (
                        <WorkspaceTable
                            headers={headers}
                            onSelected={setSelected}
                            selected={selected}
                            compact={compact}
                            onClick={onClick}
                            renderCellValue={renderCellValue}
                            rows={subscriptions.records}
                            totalRows={subscriptions.totalRecords}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onChangePage={onChangePage}
                            onChangeRowsPerPage={onChangeRowsPerPage}
                            descendingComparator={descendingComparator}
                        />
                    )}

                    {(!subscriptions || subscriptions.records.length === 0) && (
                        <NoRecords
                            message="You have not created any subscriptions yet."
                            action={true}
                            actionText="Create Subscription"
                            actionHandler={newSubscription}
                            image="assets/images/empty-subscriptions.svg"
                        />
                    )}
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
        subscriptions: state.subscriptions,
    };
}

const mapDispatchToProps = {
    fetchSubscriptions: actions.fetchSubscriptions,
    newSubscription: actions.newSubscription,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewSubscriptions));
