import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {},
    details: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        flex: "1 0 auto",
    },
    button: {
        padding: 15,
        marginLeft: "auto",
    },
}));

export default function TotalSubscriptionsCard(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root} variant="outlined">
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h3" variant="h3">
                        {props.data}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Subscriptions
                    </Typography>
                </CardContent>
                <CardActions className={classes.button}>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </div>
        </Card>
    );
}
