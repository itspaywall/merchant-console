import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import WorkspaceTable from "../common/WorkspaceTable";
import WorkspaceToolbar from "../common/WorkspaceToolbar";
import * as actions from "../../redux/actions";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/ViewList";
import CompactIcon from "@material-ui/icons/ViewCompact";

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
        identifier: "code",
        numeric: false,
        disablePadding: false,
        label: "Code",
    },
    {
        identifier: "price",
        numeric: false,
        disablePadding: false,
        label: "Price",
    },
    {
        identifier: "term",
        numeric: false,
        disablePadding: false,
        label: "Term",
    },
    {
        identifier: "setupFee",
        numeric: false,
        disablePadding: false,
        label: "Setup Fee",
    },
    {
        identifier: "trial",
        numeric: false,
        disablePadding: false,
        label: "Trial",
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

function ViewPlans(props) {
    const { plans, fetchPlans, newPlan, history } = props;
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [compact, setCompact] = useState(false);

    const handleAction = (type) => {
        if (type === "new") {
            newPlan();
        } else if (type === "compact" || type === "default") {
            setCompact(!compact);
        }
    };

    const onClick = (account) => {
        history.push("/plans/" + account.identifier);
    };

    const renderCellValue = (row, rowIndex, column, columnIndex) => {
        switch (column.identifier) {
            case "name": {
                return row.name;
            }

            case "code": {
                return row.code;
            }

            case "price": {
                return row.pricePerBillingPeriod + " INR";
            }

            case "term": {
                return row.term + " " + row.termUnit;
            }

            case "setupFee": {
                return row.setupFee + " INR";
            }

            case "trial": {
                return row.trialPeriod + " " + row.trialPeriodUnit;
            }

            default: {
                return "Unknown Column";
            }
        }
    };

    useEffect(() => {
        fetchPlans();
    }, [fetchPlans]);

    return (
        <div>
            <WorkspaceToolbar
                title="Plans"
                selectionCount={selected.length}
                actions={compact ? actions1 : actions2}
                onAction={handleAction}
            />
            <div className={classes.container}>
                <WorkspaceTable
                    headers={headers}
                    onSelected={setSelected}
                    rows={plans}
                    selected={selected}
                    compact={compact}
                    onClick={onClick}
                    renderCellValue={renderCellValue}
                    rowsPerPage={10}
                />
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        plans: state.plans,
    };
}

const mapDispatchToProps = {
    fetchPlans: actions.fetchPlans,
    newPlan: actions.newPlan,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewPlans));
