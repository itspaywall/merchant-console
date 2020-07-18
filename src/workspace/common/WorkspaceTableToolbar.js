import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/ViewList";
import FilterIcon from "@material-ui/icons/FilterList";
import CompactIcon from "@material-ui/icons/ViewCompact";

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

function WorkspaceTableToolbar(props) {
    const classes = useToolbarStyles();
    const {
        title,
        selectionCount,
        onNew,
        compact,
        toggleCompact,
        toggleFilter,
    } = props;

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

    const recordButtons = (
        <Button
            className={classes.action}
            variant="text"
            size="small"
            color="primary"
        >
            <DeleteIcon />
            Delete
        </Button>
    );
    const selected = selectionCount > 0;

    const normalButtons = (
        <React.Fragment>
            <Button
                className={classes.action}
                variant="text"
                size="small"
                color="primary"
                onClick={onNew}
            >
                <AddIcon className={classes.actionIcon} />
                New
            </Button>
            <Button
                className={classes.action}
                variant="text"
                size="small"
                color="primary"
                onClick={toggleFilter}
            >
                <FilterIcon className={classes.actionIcon} />
                Filter
            </Button>
            <Button
                className={classes.action}
                variant="text"
                size="small"
                color="primary"
                onClick={toggleCompact}
            >
                {compact ? (
                    <React.Fragment>
                        <ListIcon className={classes.actionIcon} />
                        Default View
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <CompactIcon className={classes.actionIcon} />
                        Compact
                    </React.Fragment>
                )}
            </Button>
        </React.Fragment>
    );

    return (
        <AppBar position="static" elevation={1} className={classes.appBar}>
            <Toolbar
                className={clsx(classes.toolbar, {
                    [classes.highlight]: selected,
                })}
            >
                {selected ? selectedTitle : normalTitle}

                <div className={classes.buttons}>
                    {selected ? recordButtons : normalButtons}
                </div>
            </Toolbar>
        </AppBar>
    );
}

WorkspaceTableToolbar.propTypes = {
    selectionCount: PropTypes.number.isRequired,
};

export default WorkspaceTableToolbar;
