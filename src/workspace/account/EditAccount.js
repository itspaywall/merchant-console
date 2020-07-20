import React from "react";
import { connect } from "react-redux";

import * as actions from "../../redux/actions";
import AccountFormDialog from "./AccountFormDialog";

function EditAccount(props) {
    const { account } = props;
    const onSave = (account) => {};
    return (
        <AccountFormDialog
            title="Edit Account"
            showMore={true}
            onSave={onSave}
            account={account}
        />
    );
}

function mapStateToProps(state) {
    return {
        account: state.account,
    };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
