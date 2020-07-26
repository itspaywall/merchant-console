import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";

import { connect } from "react-redux";
import {
    newAccount,
    newSubscription,
    newInvoice,
    newTransaction,
    newPlan,
} from "../redux/actions";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 260,
        minWidth: 400,
        overflow: "hidden",
    },
    main: {
        padding: 16,
    },
    groupTitle: {
        fontSize: 12,
        backgroundColor: "#F0F0F0",
        padding: 8,
        paddingLeft: 16,
        marginTop: 0,
        marginBottom: 0,
        textTransform: "uppercase",
    },
    icon: {
        display: "block !important",
        marginLeft: "auto !important",
        marginRight: "auto !important",
    },
    link: {
        color: "black",
        textDecoration: "none",
    },
    add: {
        padding: 12,
        "&:hover": {
            background: "#D3D3D3",
        },
        width: 100,
        borderRadius: 4,
        cursor: "pointer",
    },
    linkTitle: {
        marginTop: 4,
        textAlign: "center",
        fontSize: 12,
    },
}));

const groups = [
    {
        title: "Record",
        links: [
            {
                id: "account",
                title: "Account",
                icon: "account_circle",
                action: "newAccount",
            },
            {
                id: "subscription",
                title: "Subscription",
                icon: "autorenew",
                action: "newSubscription",
            },
            {
                id: "transaction",
                title: "Transaction",
                icon: "monetization_on",
                action: "newTransaction",
            },
        ],
    },
    {
        title: "Configuration",
        links: [
            {
                id: "plan",
                title: "Plan",
                icon: "local_offer",
                action: "newPlan",
            },
        ],
    },
];

function AddDialog(props) {
    const classes = useStyles();
    const { onClose, open, anchor } = props;
    const makeHandler = (link) => () => {
        onClose();
        props[link.action]();
    };

    return (
        <Popover
            open={open}
            anchorEl={anchor}
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <div className={classes.root}>
                {groups.map((group, index) => (
                    <div>
                        <h6 className={classes.groupTitle}>{group.title}</h6>
                        <Grid
                            className={classes.main}
                            container={true}
                            spacing={0}
                        >
                            {group.links.map((link, index) => (
                                <Grid item={true}>
                                    <div
                                        className={classes.add}
                                        onClick={makeHandler(link)}
                                    >
                                        <Icon className={classes.icon}>
                                            {link.icon}
                                        </Icon>
                                        <Typography
                                            className={classes.linkTitle}
                                        >
                                            {link.title}
                                        </Typography>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ))}
            </div>
        </Popover>
    );
}

AddDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
    newAccount,
    newSubscription,
    newInvoice,
    newTransaction,
    newPlan,
};

export default connect(null, mapDispatchToProps)(AddDialog);
