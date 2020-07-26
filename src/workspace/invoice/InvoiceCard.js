import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import InvoiceCardTable from "./InvoiceCardTable";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1200,
        padding: 32,
    },
    invoice: {
        fontWeight: 600,
        fontSize: 14,
    },
    title: {
        fontWeight: 400,
        fontSize: 14,
    },
    value: {
        fontSize: 14,
    },
    icon: {
        display: "inline-block",
        marginRight: 4,
    },
    close: {
        marginLeft: "auto",
        color: theme.palette.error.main,
        paddingLeft: 16,
        paddingRight: 16,
    },
    edit: {
        marginLeft: 8,
        color: theme.palette.primary.main,
        paddingLeft: 16,
        paddingRight: 16,
    },
    address: {
        marginTop: 16,
    },
    table: {
        marginTop: 32,
    },
    payment: {
        marginTop: 24,
        width: "20%",
        marginLeft: "auto",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
    },
    leftHeader: {
        width: "40%",
    },
    rightHeader: {
        width: "25%",
    },
    paymentValue: {
        textAlign: "right",
        fontSize: 14,
    },
    notes: {
        marginTop: 16,
    },
    notesTitle: {
        fontWeight: 600,
        fontSize: 14,
    },
    notesText: {
        fontSize: 14,
    },
    terms: {
        marginTop: 16,
    },
    termsText: {
        fontSize: 14,
    },
}));

const fields = [
    {
        identifier: "invoiceNumber",
        title: "Invoice Number",
        size: 12,
        render: (props) => props.invoice.invoiceNumber,
    },
    {
        identifier: "invoiceDate",
        title: "Invoice Date",
        size: 12,
        render: (props) => props.invoice.postedOn,
    },
    {
        identifier: "dueDate",
        title: "Due Date",
        size: 12,
        render: (props) => props.invoice.dueOn,
    },
];

const paymentFields = [
    {
        identifier: "subtotal",
        title: "Subtotal",
        size: 12,
        render: (props) => props.invoice.subtotal + " INR",
    },
    {
        identifier: "total",
        title: "Total",
        size: 12,
        render: (props) => props.invoice.total + " INR",
    },
    {
        identifier: "paid",
        title: "Paid",
        size: 12,
        render: (props) => props.invoice.paid + " INR",
    },
];

function InvoiceCard(props) {
    const classes = useStyles();
    const { className, invoice } = props;

    return (
        <Card className={clsx(classes.root, className)}>
            <CardContent>
                <div className={classes.header}>
                    <div className={classes.leftHeader}>
                        <div>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                className={classes.title}
                            >
                                OneCube Software Solutions
                            </Typography>
                            TODO
                            {/*
                            {props.addressLine1}
                            <br />
                            {props.addressLine2 && (
                                <React.Fragment>
                                    {props.addressLine2}
                                    <br />
                                </React.Fragment>
                            )}
                            {props.city}
                            <br />
                            {props.state} {props.zipCode}
                            <br />
                            {props.country}
                            */}
                        </div>

                        <div className={classes.address}>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                className={classes.title}
                            >
                                Hubble Inc.
                            </Typography>
                            TODO
                            {/*
                            {props.addressLine1}
                            <br />
                            {props.addressLine2 && (
                                <React.Fragment>
                                    {props.addressLine2}
                                    <br />
                                </React.Fragment>
                            )}
                            {props.city}
                            <br />
                            {props.state} {props.zipCode}
                            <br />
                            {props.country}
                            */}
                        </div>
                    </div>
                    <div className={classes.rightHeader}>
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            className={classes.invoice}
                        >
                            Invoice
                        </Typography>
                        <Grid container={true} spacing={0}>
                            {fields.map((field) => (
                                <React.Fragment>
                                    <Grid item={true} lg={6}>
                                        <Typography
                                            variant="subtitle1"
                                            color="textSecondary"
                                            className={classes.title}
                                        >
                                            {field.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item={true} lg={6}>
                                        <Typography
                                            variant="subtitle1"
                                            color="textPrimary"
                                            className={classes.value}
                                        >
                                            {field.render(props)}
                                        </Typography>
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </Grid>
                    </div>
                </div>
                <div className={classes.table}>
                    <InvoiceCardTable rows={invoice.items} />
                </div>
                <Grid container={true} spacing={1} className={classes.payment}>
                    {paymentFields.map((field) => (
                        <React.Fragment key={field.identifier}>
                            <Grid item={true} lg={6}>
                                <Typography
                                    variant="subtitle1"
                                    color="textSecondary"
                                    className={classes.title}
                                >
                                    {field.title}
                                </Typography>
                            </Grid>
                            <Grid item={true} lg={6}>
                                <Typography
                                    variant="subtitle1"
                                    color="textPrimary"
                                    className={classes.paymentValue}
                                >
                                    {field.render(props)}
                                </Typography>
                            </Grid>
                        </React.Fragment>
                    ))}
                    <Grid item={true} lg={12}>
                        <hr />
                    </Grid>
                    <Grid item={true} lg={6}>
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            className={classes.title}
                        >
                            Amount Due
                        </Typography>
                    </Grid>
                    <Grid item={true} lg={6}>
                        <Typography
                            variant="subtitle1"
                            color="textPrimary"
                            className={classes.paymentValue}
                        >
                            {props.invoice.amountDue} INR
                        </Typography>
                    </Grid>
                </Grid>
                <div className={classes.notes}>
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className={classes.notesTitle}
                    >
                        Notes
                    </Typography>
                    <Typography className={classes.notesText}>
                        {invoice.notes}
                    </Typography>
                </div>
                <div className={classes.terms}>
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className={classes.invoice}
                    >
                        Terms and Conditions
                    </Typography>
                    <Typography className={classes.termsText}>
                        {invoice.termsAndConditions}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}

export default InvoiceCard;
