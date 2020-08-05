import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 500,
        margin: 0,
        marginTop: 20,
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
    },
    details: {
        display: "flex",
        flexDirection: "column",
    },
    item: {
        margin: 10,
    },
}));

export default function Profile() {
    const classes = useStyles();
    return (
        <div>
            <Typography
                variant="h6"
                color="textPrimary"
                className={classes.title}
            >
                Profile
            </Typography>
            <Card className={classes.root} variant="outlined">
                <CardContent className={classes.details}>
                    <FormGroup>
                        <TextField
                            id="outlined-basic"
                            label="Profile Name"
                            variant="outlined"
                            className={classes.item}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Email Address"
                            variant="outlined"
                            className={classes.item}
                        />
                        <FormControlLabel
                            className={classes.item}
                            control={<Switch />}
                            label="Setting 1"
                        />
                        <FormControlLabel
                            className={classes.item}
                            control={<Switch />}
                            label="Setting 2"
                        />
                        <FormControlLabel
                            className={classes.item}
                            control={<Switch />}
                            label="Setting 3"
                        />
                        <FormControlLabel
                            className={classes.item}
                            control={<Switch />}
                            label="Setting 4"
                        />
                    </FormGroup>
                </CardContent>
            </Card>
        </div>
    );
}
