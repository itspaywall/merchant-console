import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Up from "@material-ui/icons/ExpandLessSharp";
import Down from "@material-ui/icons/ExpandMoreSharp";

const useStyles = makeStyles((theme) => ({
    content: {
        paddingTop: 24,
        paddingBottom: 24,
        flex: "1 0 auto",
    },
    button: {
        padding: 15,
        marginLeft: "auto",
    },
    upIcon: {
        verticalAlign: "bottom",
        fontSize: 32,
    },
    up: {
        color: theme.palette.success.main,
    },
    downIcon: {
        verticalAlign: "bottom",
        fontSize: 32,
    },
    down: {
        color: theme.palette.error.main,
    },
    small: {
        fontSize: 14,
    },
}));

export default function Summary(props) {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <Typography variant="subtitle1" color="textPrimary">
                {props.title}
            </Typography>
            <Typography
                variant="subtitle1"
                color="textSecondary"
                className={classes.small}
            >
                {props.period}
            </Typography>
            <Typography component="h3" variant="h3">
                {props.number}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {props.delta === "positive" ? (
                    <div className={classes.up}>
                        <Up className={classes.upIcon} />
                        {props.change}
                    </div>
                ) : (
                    <div className={classes.down}>
                        <Down className={classes.downIcon} />
                        {props.change}
                    </div>
                )}
            </Typography>
        </div>
    );
}
