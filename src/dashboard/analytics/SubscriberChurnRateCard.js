import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

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

export default function SubscriberChurnRateCard(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root} variant="outlined">
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h3" variant="h3">
                        {props.data}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Subscriber Churn Rate
                    </Typography>
                </CardContent>
                <CardActions className={classes.button}>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </div>
        </Card>
    );
}
