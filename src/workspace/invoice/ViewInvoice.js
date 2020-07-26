import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";

import WorkspaceToolbar from "../common/WorkspaceToolbar";
import InvoiceCard from "./InvoiceCard";
import * as actions from "../../redux/actions";

import DownloadIcon from "@material-ui/icons/GetApp";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 16,
    },
    InvoiceCard: {
        maxWidth: 600,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 16,
        fontWeight: 500,
    },
    subscriptions: {},
    progress: {
        position: "fixed",
        top: "50%",
        left: "50%",
        marginTop: -24,
        marginLeft: -24,
    },
}));

const primaryActions = [
    {
        identifier: "edit",
        title: "Edit",
        icon: EditIcon,
        primary: true,
    },
    {
        identifier: "download",
        title: "Download",
        icon: DownloadIcon,
        primary: true,
    },
];

function ViewInvoice(props) {
    const classes = useStyles();
    const { fetchInvoice, clearInvoice, invoice, editInvoice } = props;
    const { identifier } = useParams();

    const handleAction = (type) => {
        if (type === "edit") {
            editInvoice(invoice);
        }
    };

    useEffect(() => {
        fetchInvoice(identifier);
        return clearInvoice;
    }, [identifier, fetchInvoice, clearInvoice]);

    return (
        <div>
            <WorkspaceToolbar
                title="Invoice"
                actions={primaryActions}
                onAction={handleAction}
            />
            {!invoice && (
                <CircularProgress size="48px" className={classes.progress} />
            )}
            {invoice && (
                <div className={classes.container}>
                    <InvoiceCard
                        className={classes.invoiceCard}
                        invoice={invoice}
                    />
                </div>
            )}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        invoice: state.invoice,
    };
}

const mapDispatchToProps = {
    fetchInvoice: actions.fetchInvoice,
    clearInvoice: actions.clearInvoice,
    editInvoice: actions.editInvoice,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewInvoice));
