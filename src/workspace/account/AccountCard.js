import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { green, orange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {},
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    activeAvatar: {
        backgroundColor: green[500],
    },
    trialAvatar: {
        backgroundColor: orange[500],
    },
    title: {
        fontWeight: 600,
        fontSize: 14,
    },
    value: {
        fontSize: 15,
    },
    showMore: {
        marginLeft: "auto",
        color: theme.palette.primary.main,
        paddingLeft: 16,
        paddingRight: 16,
    },
    icon: {
        display: "inline-block",
        marginRight: 4,
    },
    menuItem: {
        fontSize: 15,
    },
}));

const fields = [
    {
        identifier: "companyName",
        title: "Company",
        size: 6,
    },
    {
        identifier: "position",
        title: "Position",
        size: 6,
    },
    {
        identifier: "emailAddress",
        title: "Email Address",
        size: 6,
    },
    {
        identifier: "phoneNumber",
        title: "Phone Number",
        size: 6,
    },
];

function SubscriptionCard(props) {
    const classes = useStyles();
    const { status, className, firstName, lastName, userName } = props;

    return (
        <Card className={clsx(classes.root, className)}>
            <CardHeader
                avatar={
                    <Avatar className={classes[status + "Avatar"]}>
                        {firstName.substring(0, 1).toUpperCase()}
                    </Avatar>
                }
                title={firstName + " " + lastName}
                subtitle={userName}
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
                                    {props[field.identifier]}
                                </Typography>
                            </Grid>
                        </React.Fragment>
                    ))}
                    <Grid item={true} lg={12}>
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            className={classes.title}
                        >
                            Address
                        </Typography>
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
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default SubscriptionCard;
