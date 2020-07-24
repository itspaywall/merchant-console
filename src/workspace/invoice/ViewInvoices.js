import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import WorkspaceTable from "../common/WorkspaceTable";
import WorkspaceToolbar from "../common/WorkspaceToolbar";
import WorkspaceFilter from "../common/WorkspaceFilter";
import { extractFilterState } from "../common/WorkspaceFilter";
import * as actions from "../../redux/actions";

import ListIcon from "@material-ui/icons/ViewList";
import FilterIcon from "@material-ui/icons/FilterList";
import CompactIcon from "@material-ui/icons/ViewCompact";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 16,
    },
}));

const headers = [
    {
        identifier: "invoiceNumber",
        numeric: false,
        disablePadding: true,
        label: "Invoice Number",
    },
    {
        identifier: "name",
        numeric: false,
        disablePadding: false,
        label: "Name",
    },
    {
        identifier: "company",
        numeric: false,
        disablePadding: false,
        label: "Company",
    },
    {
        identifier: "postedOn",
        numeric: false,
        disablePadding: false,
        label: "Posted On",
    },
    {
        identifier: "status",
        numeric: false,
        disablePadding: false,
        label: "Status",
    },
    {
        identifier: "total",
        numeric: false,
        disablePadding: false,
        label: "Total",
    },
];

const filterFields = [
    {
        identifier: "dateRange",
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
        identifier: "invoiceStatus",
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
        identifier: "collectionMethod",
        type: "select",
        title: "Collection Method",
        options: [
            {
                value: "all",
                title: "All",
            },
            {
                value: "automatic",
                title: "Automatic",
            },
            {
                value: "manual",
                title: "Manual",
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

/* [TODO]
 * 1. Filter logic
 */
function ViewInvoices(props) {
    const { invoices, fetchInvoices, history } = props;
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    const [compact, setCompact] = useState(false);

    // TODO: Should we cache this?
    const defaultFilterValues = extractFilterState(filterFields);
    const [filterValues, setFilterValues] = useState(defaultFilterValues);

    const handleAction = (type) => {
        if (type === "filter") {
            setOpenFilter(!openFilter);
        } else if (type === "compact" || type === "default") {
            setCompact(!compact);
        }
    };

    const onClick = (invoice) => {
        history.push("/invoices/" + invoice.identifier);
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

    const renderCellValue = (row, rowIndex, column, columnIndex) => {
        switch (column.identifier) {
            case "invoiceNumber": {
                return row.invoiceNumber;
            }

            case "name": {
                return row.account.firstName + " " + row.account.lastName;
            }

            case "company": {
                return row.account.companyName;
            }

            case "postedOn": {
                return row.postedOn;
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

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    return (
        <div>
            <WorkspaceToolbar
                title="Invoices"
                selectionCount={selected.length}
                actions={compact ? actions1 : actions2}
                onAction={handleAction}
            />
            <Grid container={true} className={classes.container} spacing={2}>
                <Grid item={true} lg={openFilter ? 10 : 12}>
                    <WorkspaceTable
                        headers={headers}
                        onSelected={setSelected}
                        rows={invoices}
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
