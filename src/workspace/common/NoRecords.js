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
        width: "auto",
        height: 400,
        marginTop: 96,
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
    const { message, actionText, actionHandler, action, image } = props;

    return (
        <div className={classes.container}>
            <img className={classes.image} src={image} alt="" />
            <Typography className={classes.message}>{message}</Typography>
            {action && (
                <Button
                    className={classes.action}
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={actionHandler}
                >
                    {actionText}
                </Button>
            )}
        </div>
    );
}
