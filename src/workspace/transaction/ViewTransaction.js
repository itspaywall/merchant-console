import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";

import WorkspaceToolbar from "../common/WorkspaceToolbar";
import TransactionCard from "../transaction/TransactionCard";
import * as actions from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 16,
    },
    transactionCard: {
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
    transactions: {},
    progress: {
        position: "fixed",
        top: "50%",
        left: "50%",
        marginTop: -24,
        marginLeft: -24,
    },
}));

function ViewTransaction(props) {
    const classes = useStyles();
    const {
        fetchTransaction,
        clearTransaction,
        transaction,
        editTransaction,
    } = props;
    const { identifier } = useParams();

    const handleEditTransaction = () => {
        editTransaction(transaction);
    };

    useEffect(() => {
        fetchTransaction(identifier);
        return clearTransaction;
    }, [identifier, fetchTransaction, clearTransaction]);

    return (
        <div>
            <WorkspaceToolbar title="Transaction" />
            {!transaction && (
                <CircularProgress size="48px" className={classes.progress} />
            )}
            {transaction && (
                <div className={classes.container}>
                    <div className={classes.section}>
                        <Typography
                            variant="h2"
                            className={classes.sectionTitle}
                        >
                            General
                        </Typography>
                        <TransactionCard
                            className={classes.transactionCard}
                            amount={transaction.amount}
                            tax={transaction.tax}
                            action={transaction.action}
                            paymentMethod={transaction.paymentMethod}
                            createdOn={transaction.createdOn}
                            refundable={transaction.refundable}
                            onEdit={handleEditTransaction}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        transaction: state.transaction,
    };
}

const mapDispatchToProps = {
    fetchTransaction: actions.fetchTransaction,
    clearTransaction: actions.clearTransaction,
    editTransaction: actions.editTransaction,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewTransaction));
