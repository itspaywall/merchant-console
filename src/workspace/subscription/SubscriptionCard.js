import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { green, orange } from "@material-ui/core/colors";

import MoreIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Close";
import PauseIcon from "@material-ui/icons/Pause";
import ShowMoreIcon from "@material-ui/icons/ArrowForward";

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
        identifier: "termBehavior",
        title: "Term Behavior",
        size: 6,
    },
    {
        identifier: "collection",
        title: "Collection",
        size: 6,
    },
    {
        identifier: "renewsOn",
        title: "Renews On",
        size: 6,
    },
    {
        identifier: "startedOn",
        title: "Started On",
        size: 6,
    },
    {
        identifier: "currentPeriod",
        title: "Current Period",
        size: 12,
    },
    {
        identifier: "pricePerUnit",
        title: "Price Per Unit",
        size: 6,
    },
    {
        identifier: "estimatedTotal",
        title: "Estimated Total",
        size: 6,
    },
];

function SubscriptionCard(props) {
    const classes = useStyles();
    const { status, plan, onEdit, onPause, onCancel } = props;
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
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar className={classes[status + "Avatar"]}>
                        {status.substring(0, 1).toUpperCase()}
                    </Avatar>
                }
                action={
                    <React.Fragment>
                        <IconButton onClick={handleOpenMenu}>
                            <MoreIcon />
                        </IconButton>
                    </React.Fragment>
                }
                title={plan}
                subheader="May 03, 1999"
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
                                    {props[field.identifier]}
                                </Typography>
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                <Button className={classes.showMore} size="small">
                    <ShowMoreIcon className={classes.icon} />
                    Show More
                </Button>
            </CardActions>
        </Card>
    );
}

export default SubscriptionCard;
