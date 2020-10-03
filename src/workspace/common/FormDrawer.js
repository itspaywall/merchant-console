import React from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import RecordForm from "./RecordForm";
import * as actions from "../../redux/actions";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";

const rightDrawerWidth = 600;
const wideDrawerWidth = 1000;
const navigationWidth = 100;

const useStyles = makeStyles((theme) => ({
    root: {
        width: rightDrawerWidth,
        display: "flex",
        flexDirection: "column",

        [theme.breakpoints.down("md")]: {
            width: 400,
        },
    },
    rootWide: {
        width: wideDrawerWidth,
        [theme.breakpoints.down("md")]: {
            width: 500,
        },
    },
    appBar: {},
    toolbar: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    title: {},
    container: {
        paddingLeft: 24,
        paddingRight: 0,
        display: "flex",
        flexDirection: "row",
    },
    navigation: {
        width: "navigationWidth",
        height: "calc(100vh - 128px)",
        paddingTop: 24,
        paddingBottom: 24,
        marginRight: 24,
    },
    listItem: {
        paddingLeft: 40,
        paddingRight: 40,
    },
    content: {
        paddingTop: 24,
        paddingBottom: 24,
        overflowY: "auto",
        height: "calc(100vh - 128px)",
        width: rightDrawerWidth,
        scrollbarWidth: "thin",
    },
    contentWide: {
        width: wideDrawerWidth - navigationWidth,
    },
    actions: {
        width: rightDrawerWidth,
        height: 64,
        padding: 16,
        display: "flex",
        flexDirection: "row-reverse",

        [theme.breakpoints.down("md")]: {
            width: 400,
        },
    },
    actionsWide: {
        width: wideDrawerWidth,

        [theme.breakpoints.down("md")]: {
            width: 500,
        },
    },
    spring: {
        flexGrow: 1,
    },
}));

function toRequest(groups, values) {
    const result = {};
    groups.forEach((group) => {
        group.children.forEach((field) => {
            /*if (field.type === "time_range") {
                result[field.identifier] = values[field.identifier].option;
                if (values[field.identifier].option === "custom") {
                    result[field.startIdentifier] = values[
                        field.identifier
                    ].startDate.getTime();
                    result[field.endIdentifier] = values[
                        field.identifier
                    ].endDate.getTime();
                }
            }*/
            switch (field.type) {
                case "account_lookup":
                case "plan_lookup": {
                    result[field.identifier] = values[field.identifier].id;
                    break;
                }

                case "country": {
                    result[field.identifier] = values[field.identifier].code;
                    break;
                }

                default: {
                    result[field.identifier] = values[field.identifier];
                    break;
                }
            }
        });
    });
    return result;
}

function FormDrawer(props) {
    const {
        closeDialog,
        title,
        groups,
        open,
        onSave,
        options,
        updateLookupOptions,
    } = props;
    const classes = useStyles(props);
    const [showMore, setShowMore] = React.useState(props.showMore);
    const [values, setValues] = React.useState(props.values);
    const [tabIndex, setTabIndex] = React.useState(0);
    const [saveDisabled, setSaveDisabled] = React.useState(true);

    const handleShowMore = () => {
        setShowMore(!showMore);
    };
    const handleSave = () => {
        closeDialog();
        const requestValues = toRequest(groups, values);
        console.log(requestValues);
        onSave(requestValues);
    };
    // TODO: Create a deep copy without serializing!
    const handleValueChange = (field, value) => {
        const newValues = JSON.parse(JSON.stringify(values));
        newValues[field.identifier] = value;
        setValues(newValues);
    };

    return (
        <Drawer className={classes.drawer} anchor="right" open={open}>
            <div
                className={
                    showMore
                        ? clsx(classes.root, classes.rootWide)
                        : classes.root
                }
            >
                <AppBar
                    position="static"
                    elevation={1}
                    className={classes.appBar}
                >
                    <Toolbar className={classes.toolbar}>
                        <Typography className={classes.title} variant="h6">
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className={classes.container}>
                    {showMore && (
                        <List component="nav" className={classes.navigation}>
                            {groups.map((group, groupIndex) => (
                                <ListItem
                                    className={classes.listItem}
                                    key={group.identifier}
                                    button={true}
                                    selected={tabIndex === groupIndex}
                                    onClick={() => setTabIndex(groupIndex)}
                                >
                                    <ListItemText
                                        primary={group.label}
                                        className={classes.tabText}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}

                    <div
                        className={
                            showMore
                                ? clsx(classes.content, classes.contentWide)
                                : classes.content
                        }
                    >
                        <RecordForm
                            groups={groups}
                            values={values}
                            onValueChange={handleValueChange}
                            tabIndex={tabIndex}
                            showMore={showMore}
                            options={options}
                            updateLookupOptions={updateLookupOptions}
                            onValidityChange={setSaveDisabled}
                        />
                    </div>
                </div>

                <Box
                    boxShadow={4}
                    className={
                        showMore
                            ? clsx(classes.actions, classes.actionsWide)
                            : classes.actions
                    }
                >
                    <Button
                        disabled={saveDisabled}
                        onClick={handleSave}
                        color="primary"
                        className={classes.dialogAction}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={closeDialog}
                        color="primary"
                        className={classes.dialogAction}
                    >
                        Cancel
                    </Button>
                    <div className={classes.spring}></div>
                    <Button
                        size="small"
                        variant="text"
                        onClick={handleShowMore}
                        color="secondary"
                        className={classes.extraAction}
                    >
                        <Icon>
                            {showMore
                                ? "keyboard_arrow_right"
                                : "keyboard_arrow_left"}
                        </Icon>
                        {showMore ? "Show Less" : "Show More"}
                    </Button>
                </Box>
            </div>
        </Drawer>
    );
}

FormDrawer.propTypes = {
    title: PropTypes.string.isRequired,
    showMore: PropTypes.bool,
    account: PropTypes.object,
    onSave: PropTypes.func.isRequired,
};

FormDrawer.defaultProps = {
    showMore: false,
    account: null,
};

const mapDispatchToProps = {
    closeDialog: actions.closeDialog,
};

export default connect(null, mapDispatchToProps)(FormDrawer);
