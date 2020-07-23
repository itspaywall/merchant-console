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
import CloseIcon from "@material-ui/icons/Close";

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
        marginLeft: 8,
        color: theme.palette.primary.main,
        paddingLeft: 16,
        paddingRight: 16,
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

function AccountCard(props) {
    const classes = useStyles();
    const { className, firstName, lastName, userName, onEdit, onClose } = props;

    return (
        <Card className={clsx(classes.root, className)}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
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

            <CardActions>
                <Button className={classes.close} onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                    Close
                </Button>
                <Button className={classes.edit} onClick={onEdit}>
                    <EditIcon className={classes.icon} />
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}

export default AccountCard;
