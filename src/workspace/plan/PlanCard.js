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
        identifier: "createdOn",
        title: "Created On",
        size: 6,
        render: (props) => props.createdOn,
    },
    {
        identifier: "billingPeriod",
        title: "Billing Period",
        size: 6,
        render: (props) => props.billingPeriod + " " + props.billingPeriodUnit,
    },
    {
        identifier: "pricePerBillingPeriod",
        title: "Price",
        size: 6,
        render: (props) => props.pricePerBillingPeriod + " INR",
    },
    {
        identifier: "setupFee",
        title: "Setup Fee",
        size: 6,
        render: (props) => props.setupFee + " INR",
    },
    {
        identifier: "trialPeriod",
        title: "Trial Period",
        size: 6,
        render: (props) => props.trialPeriod + " " + props.trialPeriodUnit,
    },
    {
        identifier: "term",
        title: "Term",
        size: 6,
        render: (props) => props.term + " " + props.termUnit,
    },
    {
        identifier: "starts",
        title: "Starts",
        size: 6,
        render: (props) => props.starts,
    },
    {
        identifier: "renew",
        title: "Renews",
        size: 6,
        render: (props) => (props.renews ? "Yes" : "No"),
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
                <Button className={classes.edit} onClick={onEdit}>
                    <EditIcon className={classes.icon} />
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}

export default PlanCard;
