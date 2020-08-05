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
        identifier: "name",
        numeric: false,
        disablePadding: false,
        label: "Name",
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
    {
        identifier: "nextInvoice",
        numeric: false,
        disablePadding: false,
        label: "Next Invoice",
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
                value: "cancelled",
                title: "Cancelled",
            },
            {
                value: "expired",
                title: "Expired",
            },
            {
                value: "past_due",
                title: "Past Due",
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
            newSubscription();
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

            history.push("/subscriptions?" + params.toString());
        } else {
            history.push("/subscriptions");
        }
    };

    const onClick = (subscription) => {
        history.push("/subscriptions/" + subscription.identifier);
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

    const renderCellValue = (row, rowIndex, column, columnIndex) => {
        switch (column.identifier) {
            case "plan": {
                return row.plan.name;
            }

            case "name": {
                return "TODO";
            }

            case "status": {
                return "TODO";
            }

            case "created": {
                return toDateString(row.createdOn);
            }

            case "nextInvoice": {
                return "TODO";
            }

            default: {
                return "Unknown Column";
            }
        }
    };

    useEffect(() => {
        const flatValues = toURLParams(filterFields, filterValues);
        fetchSubscriptions(flatValues);
    }, [fetchSubscriptions, filterValues]);

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
                    <WorkspaceTable
                        headers={headers}
                        onSelected={setSelected}
                        rows={subscriptions}
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
