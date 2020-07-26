import React from "react";
import { connect } from "react-redux";

import * as actions from "../../redux/actions";
import InvoiceFormDrawer from "./InvoiceFormDrawer";

function EditInvoice(props) {
    const { invoice, saveInvoice } = props;
    return (
        <InvoiceFormDrawer
            title="Edit Invoice"
            showMore={true}
            onSave={saveInvoice}
            invoice={invoice}
            open={true}
        />
    );
}

function mapStateToProps(state) {
    return {
        invoice: state.invoice,
    };
}

const mapDispatchToProps = {
    saveInvoice: actions.saveInvoice,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInvoice);
