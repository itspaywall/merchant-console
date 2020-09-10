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
        id: "referenceId",
        numeric: false,
        disablePadding: false,
        label: "Reference ID",
    },
    {
        id: "action",
        numeric: false,
        disablePadding: false,
        label: "Action",
    },
    {
        id: "method",
        numeric: false,
        disablePadding: false,
        label: "Payment Method",
    },
    {
        id: "created",
        numeric: false,
        disablePadding: false,
        label: "Created",
    },
    {
        id: "amount",
        numeric: false,
        disablePadding: false,
        label: "Amount",
    },
    {
        id: "tax",
        numeric: false,
        disablePadding: false,
        label: "Tax",
    },
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
    {
        identifier: "action_type",
        type: "select",
        title: "Action",
        options: [
            {
                value: "purchase",
                title: "Purchase",
            },
            {
                value: "verify",
                title: "Verification",
            },
            {
                value: "refund",
                title: "Refund",
            },
            {
                value: "all",
                title: "All",
            },
        ],
        defaultValue: "all",
    },
    {
        identifier: "paymentMethod",
        type: "select",
        title: "Payment Method",
        options: [
            {
                value: "cash",
                title: "Cash",
            },
            {
                value: "debit_card",
                title: "Debit Card",
            },
            {
                value: "credit_card",
                title: "Credit Card",
            },
            {
                value: "online",
                title: "Online / Netbanking",
            },
            {
                value: "all",
                title: "All",
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

const DEFAULT_ROWS_PER_PAGE = 20;

function ViewTransactions(props) {
    const {
        transactions,
        fetchTransactions,
        newTransaction,
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
    const defaultFilterValues = toFilterState(filterFields, params);
    const [filterValues, setFilterValues] = useState(defaultFilterValues);

    const generateURL = (values, page, rowsPerPage) => {
        const flatValues = toURLParams(filterFields, values);
        const params = new URLSearchParams(flatValues);
        params.append("page", page);
        params.append("limit", rowsPerPage);

        history.push("/transactions?" + params.toString());
    };

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
            newTransaction();
        } else if (type === "filter") {
            setOpenFilter(!openFilter);
        } else if (type === "compact" || type === "default") {
            setCompact(!compact);
        }
    };

    const onClick = (transaction) => {
        history.push("/transactions/" + transaction.id);
    };

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

    const actionNames = {
        purchase: "Purchase",
        verify: "Verification",
        refund: "Refund",
    };

    const methodNames = {
        cash: "Cash",
        credit_card: "Credit Card",
        debit_card: "Debit Card",
        online: "Online / Netbanking",
    };

    const descendingComparator = (transactionA, transactionB, orderBy) => {
        const keys = {
            referenceId: "referenceId",
            action: "action",
            method: "paymentMethod",
            created: "createdAt",
            amount: "amount",
        };
        const key = keys[orderBy];
        let valueA = transactionA[key];
        let valueB = transactionB[key];

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
            case "referenceId": {
                return row.referenceId;
            }

            case "created": {
                return toDateString(row.createdAt);
            }

            case "amount": {
                return row.amount + " INR";
            }

            case "tax": {
                return row.tax + " INR";
            }

            case "action": {
                return actionNames[row.action];
            }

            case "method": {
                return methodNames[row.paymentMethod];
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
        const flatValues = toURLParams(filterFields, filterValues);
        flatValues.page = page;
        flatValues.limit = rowsPerPage;
        fetchTransactions(flatValues);
    }, [fetchTransactions, filterValues, page, rowsPerPage]);

    return (
        <div>
            <WorkspaceToolbar
                title="Transactions"
                selectionCount={selected.length}
                actions={compact ? actions1 : actions2}
                onAction={handleAction}
            />
            {transactions && transactions.records.length > 0 && (
                <Grid container={true} className={classes.container}>
                    <Grid item={true} lg={openFilter ? 10 : 12}>
                        <WorkspaceTable
                            headers={headers}
                            onSelected={setSelected}
                            selected={selected}
                            compact={compact}
                            onClick={onClick}
                            renderCellValue={renderCellValue}
                            rows={transactions.records}
                            totalRows={transactions.totalRecords}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onChangePage={onChangePage}
                            onChangeRowsPerPage={onChangeRowsPerPage}
                            descendingComparator={descendingComparator}
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
            )}

            {(!transactions || transactions.records.length === 0) && (
                <NoRecords
                    message="You have not created any transactions yet."
                    action={true}
                    actionText="Create Transaction"
                    actionHandler={newTransaction}
                    image="assets/images/empty-transactions.svg"
                />
            )}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        transactions: state.transactions,
    };
}

const mapDispatchToProps = {
    fetchTransactions: actions.fetchTransactions,
    newTransaction: actions.newTransaction,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewTransactions));
