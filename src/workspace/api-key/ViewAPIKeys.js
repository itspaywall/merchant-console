import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

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
import EnabledIcon from "@material-ui/icons/CheckCircle";
import DisabledIcon from "@material-ui/icons/Cancel";
import MenuIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 16,
    },
    enabled: {
        color: green[400],
    },
    disabled: {
        color: red[400],
    },
    /*readChip: {
        margin: 2,
        background: yellow[800],
        color: 'white'
    },
    readWriteChip: {
        margin: 2,
        background: green[400],
        color: 'white'
    },
    chips: {
        maxWidth: 400
    }*/
}));

const sample = {
    records: [
        {
            name: "primary",
            permissions: [
                "READ_ACCOUNTS",
                "READ_SUBSCRIPTIONS",
                "READ_WRITE_INVOICES",
                "READ_WRITE_TRANSACIONS",
                "READ_WRITE_PLANS",
            ],
            requests: 193,
            createdAt: new Date(),
            status: "ENABLED",
        },
        {
            name: "secondary",
            permissions: ["READ_ACCOUNTS", "READ_SUBSCRIPTIONS"],
            requests: 1999,
            createdAt: new Date(),
            status: "DISABLED",
        },
    ],
};

/*const permissionLabels = {
    "READ_ACCOUNTS": "Accounts",
    "READ_WRITE_ACCOUNTS": "Accounts",
    "READ_SUBSCRIPTIONS": "Subscriptions",
    "READ_WRITE_SUBSCRIPTIONS": "Subscriptions",
    "READ_INVOICES": "Invoices",
    "READ_WRITE_INVOICES": "Invoices",
    "READ_TRANSACTIONS": "Transactions",
    "READ_WRITE_TRANSACIONS": "Transactions",
    "READ_PLANS": "Plans",
    "READ_WRITE_PLANS": "Plans",
};*/

const headers = [
    {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Name",
        clickable: true,
    },
    {
        id: "requests",
        numeric: false,
        disablePadding: false,
        label: "Requests",
        clickable: true,
    },
    {
        id: "created",
        numeric: false,
        disablePadding: false,
        label: "Created",
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
        id: "actions",
        numeric: false,
        disablePadding: true,
        label: "",
        clickable: false,
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
        identifier: "api_key_status",
        type: "select",
        title: "API Key Status",
        options: [
            {
                value: "all",
                title: "All",
            },
            {
                value: "enabled",
                title: "Enabled",
            },
            {
                value: "disabled",
                title: "Disabled",
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

function ViewAPIKeys(props) {
    const { apiKeys, fetchAPIKeys, newAPIKey, history, location } = props;
    const params = queryString.parse(location.search);
    const classes = useStyles();
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [currentAPIKey, setCurrentAPIKey] = useState(null);
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

        history.push("/api-keys?" + params.toString());
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
            newAPIKey();
        } else if (type === "filter") {
            setOpenFilter(!openFilter);
        } else if (type === "compact" || type === "default") {
            setCompact(!compact);
        }
    };

    const onClick = (account) => {
        history.push("/apiKeys/" + account.id);
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

    const makeHandleOpenMenu = (apiKey) => (event) => {
        setMenuAnchor(event.target);
        setCurrentAPIKey(apiKey);
    };

    const handleCloseMenu = () => {
        setMenuAnchor(null);
        setCurrentAPIKey(null);
    };

    const renderCellValue = (row, rowIndex, column, columnIndex) => {
        switch (column.id) {
            case "name": {
                return row.name;
            }

            /*
            case "permissions": {
                return (<div className={classes.chips}>
                    {row.permissions.map(permission => <Chip className={permission.startsWith("READ_WRITE")? classes.readWriteChip : classes.readChip} label={permissionLabels[permission]} />)}
                </div>);
            }*/

            case "status": {
                return row.status === "ENABLED" ? (
                    <EnabledIcon className={classes.enabled} />
                ) : (
                    <DisabledIcon className={classes.disabled} />
                );
            }

            case "requests": {
                return row.requests;
            }

            case "created": {
                return toDateString(row.createdAt);
            }

            case "actions": {
                return (
                    <IconButton onClick={makeHandleOpenMenu(row)}>
                        <MenuIcon />
                    </IconButton>
                );
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
        fetchAPIKeys(flatValues);
    }, [fetchAPIKeys, filterValues, page, rowsPerPage]);

    return (
        <div>
            <WorkspaceToolbar
                title="API Keys"
                selectionCount={selected.length}
                actions={compact ? actions1 : actions2}
                onAction={handleAction}
            />
            {apiKeys && apiKeys.records.length > 0 && (
                <Grid container={true} className={classes.container}>
                    <Grid item={true} lg={openFilter ? 10 : 12}>
                        <WorkspaceTable
                            headers={headers}
                            onSelected={setSelected}
                            selected={selected}
                            compact={compact}
                            onClick={onClick}
                            renderCellValue={renderCellValue}
                            rows={apiKeys.records}
                            totalRows={apiKeys.totalRecords}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onChangePage={onChangePage}
                            onChangeRowsPerPage={onChangeRowsPerPage}
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

            {(!apiKeys || apiKeys.records.length === 0) && (
                <NoRecords
                    message="You have not created any API keys yet."
                    action={true}
                    actionText="Create API Key"
                    actionHandler={newAPIKey}
                    image="assets/images/empty-api-keys.svg"
                />
            )}

            {menuAnchor && (
                <Menu
                    anchorEl={menuAnchor}
                    keepMounted={true}
                    open={Boolean(menuAnchor)}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
                    <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
                    <MenuItem onClick={handleCloseMenu}>
                        {currentAPIKey.status === "ENABLED"
                            ? "Disable"
                            : "Enable"}
                    </MenuItem>
                </Menu>
            )}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        apiKeys: sample,
    };
}

const mapDispatchToProps = {
    fetchAPIKeys: () => ({ type: "todo" }),
    newAPIKey: actions.newAPIKey,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewAPIKeys));
