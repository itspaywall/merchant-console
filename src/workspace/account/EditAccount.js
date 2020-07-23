import React from "react";
import { connect } from "react-redux";

import * as actions from "../../redux/actions";
import AccountFormDrawer from "./AccountFormDrawer";

function EditAccount(props) {
    const { account, saveAccount } = props;
    return (
        <AccountFormDrawer
            title="Edit Account"
            showMore={true}
            onSave={saveAccount}
            account={account}
            open={true}
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
