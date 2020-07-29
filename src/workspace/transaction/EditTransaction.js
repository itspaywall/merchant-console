import React from "react";
import { connect } from "react-redux";

import * as actions from "../../redux/actions";
import TransactionFormDrawer from "./TransactionFormDrawer";

function EditTransaction(props) {
    const { transaction, saveTransaction } = props;
    return (
        <TransactionFormDrawer
            title="Edit Transaction"
            showMore={true}
            onSave={saveTransaction}
            transaction={transaction}
            open={true}
        />
    );
}

function mapStateToProps(state) {
    return {
        transaction: state.transaction,
    };
}

const mapDispatchToProps = {
    saveTransaction: actions.saveTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTransaction);
