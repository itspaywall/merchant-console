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
// import CloseIcon from "@material-ui/icons/Close";

import { findCountryByCode } from "../../common/countries";

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

function getCountryName(code) {
    if (!code) {
        return null;
    }
    const country = findCountryByCode(code);
    console.log(country);
    return country ? country.label : null;
}

const fields = [
    {
        identifier: "emailAddress",
        title: "Email Address",
        size: 6,
        render: (props) =>
            props.emailAddress ? props.emailAddress : "Unavailable",
    },
    {
        identifier: "phoneNumber",
        title: "Phone Number",
        size: 6,
        render: (props) =>
            props.phoneNumber ? props.phoneNumber : "Unavailable",
    },
    {
        identifier: "address",
        title: "Address",
        size: 6,
        render: (props) => {
            const {
                addressLine1,
                addressLine2,
                city,
                state,
                zipCode,
                country,
            } = props;
            const available =
                addressLine1 ||
                addressLine2 ||
                city ||
                state ||
                zipCode ||
                country;
            return available ? (
                <React.Fragment>
                    {addressLine1 && (
                        <React.Fragment>
                            {addressLine1} <br />
                        </React.Fragment>
                    )}
                    {addressLine2 && (
                        <React.Fragment>
                            {addressLine2}
                            <br />
                        </React.Fragment>
                    )}
                    {city && (
                        <React.Fragment>
                            {city}
                            <br />
                        </React.Fragment>
                    )}
                    {state && (
                        <React.Fragment>
                            {state}
                            <br />
                        </React.Fragment>
                    )}
                    {country && (
                        <React.Fragment>
                            {getCountryName(country)}
                            <br />
                        </React.Fragment>
                    )}
                </React.Fragment>
            ) : (
                "Unavailable"
            );
        },
    },
];

function AccountCard(props) {
    const classes = useStyles();
    const {
        className,
        firstName,
        lastName,
        userName,
        onEdit /*, onClose */,
    } = props;

    return (
        <Card className={clsx(classes.root, className)}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        {firstName.substring(0, 1).toUpperCase()}
                    </Avatar>
                }
                title={firstName + " " + lastName}
                subheader={userName}
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
                {/*<Button className={classes.close} onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                    Close
                </Button>*/}
                <Button className={classes.edit} onClick={onEdit}>
                    <EditIcon className={classes.icon} />
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}

export default AccountCard;
