import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import WorkspaceTable from "../common/WorkspaceTable";
import WorkspaceTableToolbar from "../common/WorkspaceTableToolbar";
import * as actions from "../../actions";

const useStyles = makeStyles(theme => ({
    container: {
        padding: 16
    }
}));

const headers = [
    { id: "name", numeric: false, disablePadding: true, label: "Name" },
    { id: "email", numeric: false, disablePadding: false, label: "Email" },
    { id: "company", numeric: false, disablePadding: false, label: "Company" },
    { id: "created", numeric: false, disablePadding: false, label: "Created" },
    { id: "plans", numeric: false, disablePadding: false, label: "Plans" },
];

function ViewAccounts(props) {
    const { accounts, fetchAccounts, newAccount } = props;
    const classes = useStyles();
    const [ selected, setSelected ] = useState([]);
    const [ compact, setCompact ] = useState(false);;
    const openFilterAccounts = () => {
    };
    const toggleCompact = () => {
        setCompact(!compact);
    };

    useEffect(() => {
        fetchAccounts();
    }, [ fetchAccounts ]);

    return (
        <div>
            <WorkspaceTableToolbar
                title="Accounts"
                selectionCount={selected.length}
                toggleCompact={toggleCompact}
                onNewAccount={newAccount}
                compact={compact} />
            <Grid container={ true } className={ classes.container }>
                <Grid item={ true } lg={ 12 }>
                    <WorkspaceTable headers={headers} onSelected={setSelected} rows={accounts} selected={selected} compact={compact} />
                </Grid>
            </Grid>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        accounts: state.accounts
    };
}

<<<<<<< HEAD
export default ViewAccounts;
=======
const mapDispatchToProps = {
    fetchAccounts: actions.fetchAccounts,
    newAccount: actions.newAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAccounts);
>>>>>>> b1d8298... Created the "View Accounts" page.
