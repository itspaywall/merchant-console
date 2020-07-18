import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShowMoreIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles((theme) => ({
    root: {},
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
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
    title: {
        fontWeight: 500,
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
    showMoreIcon: {
        display: "inline-block",
        marginRight: 4,
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
];

export default function SubscriptionCard(props) {
    const classes = useStyles();
    const { status, plan } = props;

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar className={classes[status + "Avatar"]}>A</Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={plan}
                subheader="May 03, 1999"
            />
            <CardContent>
                <Grid container={true} spacing={1}>
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
                    <ShowMoreIcon className={classes.showMoreIcon} />
                    Show More
                </Button>
            </CardActions>
        </Card>
    );
}
