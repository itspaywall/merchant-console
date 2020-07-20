import React from "react";
import { connect } from "react-redux";

import * as actions from "../../redux/actions";
import AccountFormDialog from "./AccountFormDialog";

function EditAccount(props) {
    const { account, saveAccount, clearAccount } = props;
    return (
        <AccountFormDialog
            title="Edit Account"
            showMore={true}
            onSave={saveAccount}
            account={account}
        />
    );
}

function mapStateToProps(state) {
    return {
        account: state.account,
    };
}

const mapDispatchToProps = {
    saveAccount: actions.saveAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
