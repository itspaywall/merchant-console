import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";

import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        backgroundColor: green[500],
    },
    title: {
        fontWeight: 600,
        fontSize: 14,
    },
    value: {
        fontSize: 15,
    },
    icon: {
        display: "inline-block",
        marginRight: 4,
    },
    button: {
        color: theme.palette.primary.main,
        marginLeft: "auto",
    },
}));

const actionNames = {
    purchase: "Purchase",
    verify: "Verification",
    refund: "Refund",
};

const methodNames = {
    cash: "Cash",
    credit_card: "Credit Card",
    debit_card: "Debit Card",
    online: "Online / Netbanking",
};

const fields = [
    {
        identifier: "action",
        title: "Action",
        size: 6,
        render: (transaction) => actionNames[transaction.action],
    },
    {
        identifier: "paymentMethod",
        title: "Payment Method",
        size: 6,
        render: (transaction) => methodNames[transaction.paymentMethod],
    },
    {
        identifier: "createdOn",
        title: "Transaction Date",
        size: 6,
        render: (transaction) => transaction.createdOn,
    },
    {
        identifier: "refundable",
        title: "Refundable",
        size: 6,
        render: (transaction) => (transaction.refundable ? "Yes" : "No"),
    },
    {
        identifier: "amount",
        title: "Amount",
        size: 6,
        render: (transaction) => transaction.amount + " INR",
    },
    {
        identifier: "tax",
        title: "Tax",
        size: 6,
        render: (transaction) => transaction.tax + " INR",
    },
    {
        identifier: "total",
        title: "Total Amount",
        size: 12,
        render: (transaction) => transaction.amount + transaction.tax + " INR",
    },
];

function TransactionCard(props) {
    const classes = useStyles();
    const { className, onEdit } = props;

    return (
        <Card className={clsx(classes.root, className)}>
            <CardHeader
                avatar={<Avatar className={classes.avatar}>₹</Avatar>}
                title="Transaction"
            />

            <CardContent>
                <Grid container={true} spacing={2}>
                    {fields.map((field) => (
                        <React.Fragment>
                            <Grid item={true} lg={field.size}>
                                <Typography
                                    variant="subtitle1"
                                    color="textSecondary"
                                    className={classes.title}
                                >
                                    {field.title}
                                </Typography>
                                <Typography className={classes.value}>
                                    {field.render(props)}
                                </Typography>
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </CardContent>
            <CardActions>
                <Button className={classes.button} onClick={onEdit}>
                    <EditIcon className={classes.icon} />
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}

export default TransactionCard;
