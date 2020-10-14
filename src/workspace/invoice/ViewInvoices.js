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
        id: "invoiceNumber",
        numeric: false,
        disablePadding: false,
        label: "Invoice Number",
        clickable: true,
    },
    {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Name",
        clickable: true,
    },
    {
        id: "createdAt",
        numeric: false,
        disablePadding: false,
        label: "Created On",
        clickable: true,
    },
    {
        id: "dueAt",
        numeric: false,
        disablePadding: false,
        label: "Due On",
        clickable: true,
    },
    {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Status",
        clickable: true,
    },
    {
        id: "total",
        numeric: false,
        disablePadding: false,
        label: "Total",
        clickable: true,
    },
];

const filterFields = [
    {
        identifier: "date_range",
        type: "time_range",
        title: "Time Range",
        startTitle: "Start Date",
        startIdentifier: "startDate",
        endTitle: "End Date",
        endIdentifier: "endDate",
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
        identifier: "invoice_status",
        type: "select",
        title: "Invoice Status",
        options: [
            {
                value: "all",
                title: "All",
            },
            {
                value: "pending",
                title: "Pending",
            },
            {
                value: "processing",
                title: "Processing",
            },
            {
                value: "pastDue",
                title: "Past Due",
            },
            {
                value: "paid",
                title: "Paid",
            },
            {
                value: "failed",
                title: "Failed",
            },
            {
                value: "voided",
                title: "Voided",
            },
            {
                value: "closed",
                title: "Closed",
            },
        ],
        defaultValue: "all",
    },
    {
        identifier: "origin",
        type: "select",
        title: "Origin",
        options: [
            {
                value: "all",
                title: "All",
            },
            {
                value: "purchase",
                title: "Purchase",
            },
            {
                value: "renewal",
                title: "Renewal",
            },
            {
                value: "immediateChange",
                title: "Immediate Change",
            },
            {
                value: "termination",
                title: "Termination",
            },
            {
                value: "refund",
                title: "Refund",
            },
            {
                value: "postedCredit",
                title: "Posted Credit",
            },
            {
                value: "giftCardRedemption",
                title: "Gift Card Redemption",
            },
            {
                value: "writeOff",
                title: "Write Off",
            },
            {
                value: "carryforwardCredit",
                title: "Carryforward Credit",
            },
            {
                value: "carryforwardGiftCredit",
                title: "Carryforward Gift Credit",
            },
            {
                value: "usageCorrection",
                title: "Usage Correction",
            },
        ],
        defaultValue: "all",
    },
];

const actions1 = [
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
];

const actions2 = [
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
];

const statusNames = {
    pending: "Pending",
    processing: "Processing",
    pastDue: "Past Due",
    paid: "Paid",
    failed: "Failed",
    voided: "Voided",
    closed: "Closed",
};

const DEFAULT_ROWS_PER_PAGE = 20;

/* [TODO]
 * 1. Filter logic
 */
function ViewInvoices(props) {
    const { invoices, fetchInvoices, history, location } = props;
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

        history.push("/invoices?" + params.toString());
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
        if (type === "filter") {
            setOpenFilter(!openFilter);
        } else if (type === "compact" || type === "default") {
            setCompact(!compact);
        }
    };

    const onClick = (invoice) => {
        history.push("/invoices/" + invoice.id);
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

    const descendingComparator = (invoiceA, invoiceB, orderBy) => {
        const keys = {
            invoiceNumber: "invoiceNumber",
            createdAt: "createdAt",
            dueAt: "dueAt",
            status: "status",
            total: "total",
        };
        const key = keys[orderBy];
        let valueA = invoiceA[key];
        let valueB = invoiceB[key];

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
            case "invoiceNumber": {
                return row.invoiceNumber;
            }

            case "name": {
                return row.account.firstName + " " + row.account.lastName;
            }

            case "createdAt": {
                return toDateString(row.createdAt);
            }

            case "dueAt": {
                return toDateString(row.dueAt);
            }

            case "status": {
                return statusNames[row.status];
            }

            case "total": {
                return row.total + " INR";
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
        fetchInvoices(flatValues);
    }, [fetchInvoices, filterValues, page, rowsPerPage]);

    return (
        <div>
            <WorkspaceToolbar
                title="Invoices"
                selectionCount={selected.length}
                actions={compact ? actions1 : actions2}
                onAction={handleAction}
            />
            <Grid container={true} className={classes.container}>
                <Grid item={true} lg={openFilter ? 10 : 12}>
                    {invoices && invoices.records.length > 0 && (
                        <WorkspaceTable
                            headers={headers}
                            onSelected={setSelected}
                            selected={selected}
                            compact={compact}
                            onClick={onClick}
                            rows={invoices.records}
                            renderCellValue={renderCellValue}
                            totalRows={invoices.totalRecords}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onChangePage={onChangePage}
                            onChangeRowsPerPage={onChangeRowsPerPage}
                            descendingComparator={descendingComparator}
                        />
                    )}

                    {(!invoices || invoices.records.length === 0) && (
                        <NoRecords
                            message="There are no invoices yet."
                            image="assets/images/empty-invoices.svg"
                            action={false}
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
        invoices: state.invoices,
    };
}

const mapDispatchToProps = {
    fetchInvoices: actions.fetchInvoices,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewInvoices));
