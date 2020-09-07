import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

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
    close: {
        marginLeft: "auto",
        color: theme.palette.error.main,
        paddingLeft: 16,
        paddingRight: 16,
    },
    edit: {
        marginLeft: "auto",
        color: theme.palette.primary.main,
        paddingLeft: 16,
        paddingRight: 16,
    },
}));

const fields = [
    {
        identifier: "createdAt",
        title: "Created At",
        size: 6,
        render: (props) => props.createdAt.substring(0, 10),
        check: (props) => (props.createdAt ? true : false),
    },
    {
        identifier: "billingPeriod",
        title: "Billing Period",
        size: 6,
        render: (props) => props.billingPeriod + " " + props.billingPeriodUnit,
        check: (props) => (props.billingPeriod ? true : false),
    },
    {
        identifier: "pricePerBillingPeriod",
        title: "Price",
        size: 6,
        render: (props) => props.price + " INR",
        check: (props) => (props.price ? true : false),
    },
    {
        identifier: "setupFee",
        title: "Setup Fee",
        size: 6,
        render: (props) => props.setupFee + " INR",
        check: (props) => (props.setupFee ? true : false),
    },
    {
        identifier: "trialPeriod",
        title: "Trial Period",
        size: 6,
        render: (props) => props.trial + " " + props.trialUnit,
        check: (props) => (props.trail ? true : false),
    },
    {
        identifier: "term",
        title: "Term",
        size: 6,
        render: (props) => props.term + " " + props.termUnit,
        check: (props) => ("term" in props ? true : false),
    },
    {
        identifier: "starts",
        title: "Starts",
        size: 6,
        render: (props) => props.starts,
        check: (props) => (props.starts ? true : false),
    },
    {
        identifier: "renew",
        title: "Renews",
        size: 6,
        render: (props) => (props.renews ? "Yes" : "No"),
        check: (props) => (props.renews ? true : false),
    },
];

function PlanCard(props) {
    const classes = useStyles();
    const { className, name, code, description, onEdit } = props;

    return (
        <Card className={clsx(classes.root, className)}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        {name.substring(0, 1).toUpperCase()}
                    </Avatar>
                }
                title={name + " (" + code + ")"}
                subtitle={description}
            />

            <CardContent>
                <Grid container={true} spacing={2}>
                    {fields.map((field) =>
                        field.check(props) ? (
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
                                        {console.log(props)}
                                    </Typography>
                                </Grid>
                            </React.Fragment>
                        ) : (
                            <React.Fragment />
                        )
                    )}
                </Grid>
            </CardContent>

            <CardActions>
                <Button className={classes.edit} onClick={onEdit}>
                    <EditIcon className={classes.icon} />
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}

export default PlanCard;
