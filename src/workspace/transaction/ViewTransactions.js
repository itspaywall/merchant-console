import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import WorkspaceTable from "../common/WorkspaceTable";
import WorkspaceToolbar from "../common/WorkspaceToolbar";
import WorkspaceFilter from "../common/WorkspaceFilter";
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
        identifier: "action",
        numeric: false,
        disablePadding: false,
        label: "Action",
    },
    {
        identifier: "method",
        numeric: false,
        disablePadding: false,
        label: "Payment Method",
    },
    {
        identifier: "date",
        numeric: false,
        disablePadding: false,
        label: "Date",
    },
    {
        identifier: "amount",
        numeric: false,
        disablePadding: false,
        label: "Amount",
    },
    {
        identifier: "tax",
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

function ViewTransactions(props) {
    const {
        transactions,
        fetchTransactions,
        newTransaction,
        history,
        location,
    } = props;
    const params = queryString.parse(location.search);

    if ("start_date" in params) {
        params["start_date"] = new Date(Number(params["start_date"]));
    }
    if ("end_date" in params) {
        params["end_date"] = new Date(Number(params["end_date"]));
    }
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [openFilter, setOpenFilter] = useState(
        Object.keys(params).length > 0
    );
    const [compact, setCompact] = useState(false);

    // TODO: Should we cache this?
    const defaultFilterValues = toFilterState(filterFields, params);
    const [filterValues, setFilterValues] = useState(defaultFilterValues);

    const handleAction = (type) => {
        if (type === "new") {
            newTransaction();
        } else if (type === "filter") {
            setOpenFilter(!openFilter);
        } else if (type === "compact" || type === "default") {
            setCompact(!compact);
        }
    };

    const generateURL = (values) => {
        if (values) {
            const flatValues = toURLParams(filterFields, values);
            const params = new URLSearchParams(flatValues);

            history.push("/transactions?" + params.toString());
        } else {
            history.push("/transactions");
        }
    };

    const onClick = (transaction) => {
        history.push("/transactions/" + transaction.identifier);
    };

    // TODO: Create a deep copy without serializing !
    const onFilterValueChange = (field, value) => {
        const newValues = Object.assign({}, filterValues);
        newValues[field] = value;
        setFilterValues(newValues);
        generateURL(newValues);
    };

    const onFilterClear = () => {
        const defaultValues = toFilterState(filterFields, {});
        setFilterValues(defaultValues);
        generateURL(null);
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

    const renderCellValue = (row, rowIndex, column, columnIndex) => {
        switch (column.identifier) {
            case "action": {
                return actionNames[row.action];
            }

            case "method": {
                return methodNames[row.paymentMethod];
            }

            case "date": {
                return toDateString(row.createdOn);
            }

            case "amount": {
                return row.amount + " INR";
            }

            case "tax": {
                return row.tax + " INR";
            }

            default: {
                return "Unknown Column";
            }
        }
    };

    useEffect(() => {
        const flatValues = toURLParams(filterFields, filterValues);
        fetchTransactions(flatValues);
    }, [fetchTransactions, filterValues]);

    return (
        <div>
            <WorkspaceToolbar
                title="Transactions"
                selectionCount={selected.length}
                actions={compact ? actions1 : actions2}
                onAction={handleAction}
            />
            <Grid container={true} className={classes.container}>
                <Grid item={true} lg={openFilter ? 10 : 12}>
                    <WorkspaceTable
                        headers={headers}
                        onSelected={setSelected}
                        rows={transactions}
                        selected={selected}
                        compact={compact}
                        onClick={onClick}
                        renderCellValue={renderCellValue}
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
