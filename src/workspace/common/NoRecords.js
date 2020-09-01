import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    image: {
        width: 800,
        height: "auto",
    },
    message: {
        fontSize: 20,
        fontWeight: 400,
        color: theme.palette.text.secondary,
    },
    action: {
        marginTop: 16,
    },
}));

export default function NoRecords(props) {
    const classes = useStyles();
    const { message, actionText, actionHandler } = props;

    return (
        <div className={classes.container}>
            <img
                className={classes.image}
                src="assets/images/no-accounts.svg"
                alt=""
            />
            <Typography className={classes.message}>{message}</Typography>
            <Button
                className={classes.action}
                variant="contained"
                size="large"
                color="secondary"
                onClick={actionHandler}
            >
                {actionText}
            </Button>
        </div>
    );
}
