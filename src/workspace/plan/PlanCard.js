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
import { toDateString } from "../../utils";

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
        render: (props) =>
            toDateString(new Date(props.createdAt.substring(0, 10))),
    },
    {
        identifier: "billingPeriod",
        title: "Billing Period",
        size: 6,
        render: (props) =>
            props.billingPeriod
                ? props.billingPeriod + " " + props.billingPeriodUnit
                : "Unavailable",
    },
    {
        identifier: "pricePerBillingPeriod",
        title: "Price",
        size: 6,
        render: (props) =>
            props.pricePerBillingPeriod
                ? props.pricePerBillingPeriod + " INR"
                : "Unavailable",
    },
    {
        identifier: "setupFee",
        title: "Setup Fee",
        size: 6,
        render: (props) =>
            props.setupFee ? props.setupFee + " INR" : "Unavailable",
    },
    {
        identifier: "trialPeriod",
        title: "Trial Period",
        size: 6,
        render: (props) =>
            props.trialPeriod
                ? props.trialPeriod + " " + props.trialPeriodUnit
                : "Unavailable",
    },
    {
        identifier: "term",
        title: "Term",
        size: 6,
        render: (props) =>
            props.term ? props.term + " " + props.termUnit : "Unavailable",
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
    const { className, name, code, description } = props;

    return (
        <Card className={clsx(classes.root, className)}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        {name.substring(0, 1).toUpperCase()}
                    </Avatar>
                }
                title={name}
                subheader={code}
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

            {/*<CardActions>
                <Button className={classes.edit} onClick={onEdit}>
                    <EditIcon className={classes.icon} />
                    Edit
                </Button>
            </CardActions>*/}
        </Card>
    );
}

export default PlanCard;
