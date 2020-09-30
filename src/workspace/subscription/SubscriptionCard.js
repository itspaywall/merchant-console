import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { green, orange } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

import MoreIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Close";
import PauseIcon from "@material-ui/icons/Pause";

import { toDateString } from "../../utils";

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
    link: {
        textDecoration: "none",
    },
}));

const statuses = {
    future: "Future",
    in_trial: "In Trial",
    active: "Active",
    pending: "Pending",
    halted: "Halted",
    canceled: "Canceled",
    expired: "Expired",
    paused: "Paused",
};

const fields = [
    {
        identifier: "status",
        title: "Status",
        size: 6,
        render: (subscription) => statuses[subscription.status],
    },
    {
        identifier: "createdOn",
        title: "Created",
        size: 6,
        render: (subscription) => toDateString(subscription.createdAt),
    },
    {
        identifier: "currentPeriodStart",
        title: "Current Period Start",
        size: 6,
        render: (subscription) =>
            subscription.currentPeriodStart
                ? toDateString(subscription.currentPeriodStart)
                : "Unavailable",
    },
    {
        identifier: "currentPeriodEnd",
        title: "Current Period End",
        size: 6,
        render: (subscription) =>
            subscription.currentPeriodEnd
                ? toDateString(subscription.currentPeriodEnd)
                : "Unavailable",
    },
    {
        identifier: "renews",
        title: "Renews",
        size: 6,
        render: (subscription) => (subscription.renews ? "Yes" : "No"),
    },
    {
        identifier: "totalBillingCycles",
        title: "Total Billing Cycles",
        size: 6,
        render: (subscription) => subscription.totalBillingCycles,
    },
    {
        identifier: "quantity",
        title: "Quantity",
        size: 6,
        render: (subscription) => subscription.quantity,
    },
    {
        identifier: "setupFee",
        title: "Setup Fee",
        size: 6,
        render: (subscription) => `${subscription.setupFee} INR`,
    },
    /*{
        identifier: "renewsOn",
        title: "Renews On",
        size: 6,
        render: (subscription) => subscription.renewsOn,
    },
    {
        identifier: "startedOn",
        title: "Started On",
        size: 6,
        render: (subscription) => subscription.startedOn,
    },
    {
        identifier: "currentPeriod",
        title: "Current Period",
        size: 12,
        render: (subscription) =>
            subscription.currentPeriodStart +
            " - " +
            subscription.currentPeriodEnd,
    },*/
    {
        identifier: "pricePerUnit",
        title: "Price Per Unit",
        size: 6,
        render: (subscription) => `${subscription.pricePerBillingCycle} INR`,
    },
    {
        identifier: "estimatedTotal",
        title: "Estimated Total",
        size: 6,
        render: (subscription) =>
            `${subscription.pricePerBillingCycle * subscription.quantity} INR`,
    },
];

function SubscriptionCard(props) {
    const classes = useStyles();
    const {
        className,
        onEdit,
        onPause,
        onCancel,
        accountId,
        accountFirstName,
        accountLastName,
        accountUserName,
        planId,
        planName,
        planCode,
        notes,
        termsAndConditions,
    } = props;
    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleOpenMenu = (event) => setMenuAnchor(event.target);
    const handleCloseMenu = () => setMenuAnchor(null);
    const handleEdit = () => {
        onEdit("id");
        setMenuAnchor(null);
    };
    const handlePause = () => {
        onPause("id");
        setMenuAnchor(null);
    };
    const handleCancel = () => {
        onCancel("id");
        setMenuAnchor(null);
    };

    return (
        <Card className={clsx(classes.root, className)}>
            <CardHeader
                avatar={
                    <Avatar className={classes.activeAvatar}>
                        {planName.substring(0, 1).toUpperCase()}
                    </Avatar>
                }
                action={
                    <React.Fragment>
                        <IconButton onClick={handleOpenMenu}>
                            <MoreIcon />
                        </IconButton>
                    </React.Fragment>
                }
                title={
                    <Link
                        className={classes.link}
                        to={`/plans/${planId}`}
                    >{`${planName} • ${planCode}`}</Link>
                }
                subheader={
                    <Link
                        className={classes.link}
                        to={`/accounts/${accountId}`}
                    >{`${accountFirstName} ${accountLastName} • ${accountUserName}`}</Link>
                }
            />

            <Menu
                anchorEl={menuAnchor}
                keepMounted
                open={Boolean(menuAnchor)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleEdit} className={classes.menuItem}>
                    <EditIcon className={classes.icon} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handlePause} className={classes.menuItem}>
                    <PauseIcon className={classes.icon} />
                    Pause
                </MenuItem>
                <MenuItem onClick={handleCancel} className={classes.menuItem}>
                    <CancelIcon className={classes.icon} />
                    Cancel
                </MenuItem>
            </Menu>

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
                    {notes && (
                        <Grid item={true} sm={12}>
                            <Typography
                                color="textSecondary"
                                className={classes.title}
                            >
                                Notes
                            </Typography>
                            <Typography>{notes}</Typography>
                        </Grid>
                    )}
                    {termsAndConditions && (
                        <Grid item={true} sm={12}>
                            <Typography
                                color="textSecondary"
                                className={classes.title}
                            >
                                Terms and Conditions
                            </Typography>
                            <Typography>{termsAndConditions}</Typography>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
}

export default SubscriptionCard;
