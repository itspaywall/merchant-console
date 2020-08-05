import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import WorkspaceToolbar from "../../workspace/common/WorkspaceToolbar";
import Profile from "./Profile";
import Company from "./Company";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            {...other}
        >
            {value === index && <Box p={3}> {children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
    card: {
        margin: 24,
        borderRadius: 0,
        justifyContent: "space-evenly",
    },
    details: {
        flexDirection: "column",
        padding: 0,
    },
    tabs: {
        margin: 0,
        paddingTop: 24,
    },
    tab: {
        margin: 0,
    },
}));

export default function Preferences() {
    const classes = useStyles();
    const [tabIndex, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <WorkspaceToolbar title="Preferences" />
            <Grid container={true}>
                <Grid item={true} xs={12} md={2}>
                    <Card variant="outlined" className={classes.card}>
                        <CardContent className={classes.details}>
                            <Tabs
                                orientation="vertical"
                                variant="fullWidth"
                                value={tabIndex}
                                onChange={handleChange}
                                className={classes.tabs}
                            >
                                <Tab label="Profile" />
                                <Tab label="Company" />
                            </Tabs>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item={true} xs={12} md={10}>
                    <TabPanel value={tabIndex} index={0}>
                        <Profile />
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1}>
                        <Company />
                    </TabPanel>
                </Grid>
            </Grid>
        </div>
    );
}
