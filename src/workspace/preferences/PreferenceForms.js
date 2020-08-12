import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import RecordForm, { extractValues } from "../RecordForm";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        borderRadius: 0,
        width: "50%",
    },
    details: {
        padding: 24,
    },
    actions: {
        width: "100%",
        display: "flex",
        flexDirection: "row-reverse",
    },
    action: {
        width: 100,
    },
    actionIcon: {
        marginRight: 4,
        display: "inline-block",
    },
}));

export default function PreferenceForms(props) {
    const classes = useStyles();
    const { groups } = props;
    const [values, setValues] = React.useState(extractValues(groups));

    const handleValueChange = (field, value) => {
        const newValues = JSON.parse(JSON.stringify(values));
        newValues[field.identifier] = value;

        setValues(newValues);
    };
    const tabIndex = 0;
    const showMore = true;

    return (
        <div>
            <Card className={classes.root} variant="outlined">
                <CardContent className={classes.details}>
                    <RecordForm
                        groups={groups}
                        values={values}
                        onValueChange={handleValueChange}
                        tabIndex={tabIndex}
                        showMore={showMore}
                    />
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button
                        size="small"
                        variant="text"
                        color="primary"
                        className={classes.action}
                    >
                        <Icon className={classes.actionIcon}>save</Icon>
                        Save
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
