import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useToolbarStyles = makeStyles((theme) => ({
    appBar: {
        color: theme.palette.primary,
        background: "white",
    },
    toolbar: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    buttons: {
        marginLeft: "auto",
    },
    action: {
        textTransform: "none",
        paddingLeft: 16,
        paddingRight: 16,
    },
    title: {
        color: theme.palette.text.primary,
        fontWeight: 500,
    },
    highlight:
        theme.palette.type === "light"
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    actionIcon: {
        marginRight: 4,
    },
}));

function WorkspaceToolbar(props) {
    const classes = useToolbarStyles();
    const { title, selectionCount, actions, onAction } = props;

    const makeActionHandler = (identifier) => () => onAction(identifier);

    const normalTitle = (
        <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
        >
            {title}
        </Typography>
    );

    const selectedTitle = (
        <Typography
            className={classes.title}
            variant="subtitle1"
            component="div"
        >
            {selectionCount} selected
        </Typography>
    );

    const selected = selectionCount > 0;

    const recordButtons = () => {
        if (actions) {
            return actions.map(
                (action) =>
                    !action.primary && (
                        <Button
                            className={classes.action}
                            variant="text"
                            size="small"
                            color="primary"
                            onClick={makeActionHandler(action.identifier)}
                        >
                            <action.icon className={classes.actionIcon} />
                            {action.title}
                        </Button>
                    )
            );
        }
        return null;
    };

    const normalButtons = () => {
        if (actions) {
            return (
                <React.Fragment>
                    {actions.map(
                        (action) =>
                            action.primary && (
                                <Button
                                    className={classes.action}
                                    variant="text"
                                    size="small"
                                    color="primary"
                                    onClick={makeActionHandler(
                                        action.identifier
                                    )}
                                >
                                    <action.icon
                                        className={classes.actionIcon}
                                    />
                                    {action.title}
                                </Button>
                            )
                    )}
                </React.Fragment>
            );
        }
        return null;
    };

    return (
        <AppBar position="static" elevation={1} className={classes.appBar}>
            <Toolbar
                className={clsx(classes.toolbar, {
                    [classes.highlight]: selected,
                })}
            >
                {selected ? selectedTitle : normalTitle}

                <div className={classes.buttons}>
                    {selected ? recordButtons() : normalButtons()}
                </div>
            </Toolbar>
        </AppBar>
    );
}

WorkspaceToolbar.propTypes = {
    selectionCount: PropTypes.number.isRequired,
};

export default WorkspaceToolbar;
