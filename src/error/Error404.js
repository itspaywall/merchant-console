import React from "react";
import { withStyles, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = (theme) => ({
    root: {},
    image: {
        marginTop: 120,
        width: 600,
        height: "auto",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
    },
    title: {
        marginTop: 16,
        textAlign: "center",
    },
    description: {
        marginTop: 16,
        textAlign: "center",
    },
    link: {
        marginTop: 16,
        textAlign: "center",
        display: "block",
    },
});

function Error404(props) {
    const { classes } = props;
    return (
        <Grid container={true} justify="center" className={classes.root}>
            <Grid item={true} lg={6}>
                <img
                    className={classes.image}
                    src="assets/images/404.png"
                    alt="Error 404"
                />
                <Typography
                    variant="h4"
                    color="textSecondary"
                    className={classes.title}
                >
                    Looks like you are lost
                </Typography>

                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.description}
                >
                    The page you are looking for may have been removed or moved
                    to another location.
                </Typography>

                <Link className={classes.link} to="/analytics">
                    Go back to analytics
                </Link>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(Error404);
