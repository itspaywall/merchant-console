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
import PreferenceForms from "./PreferenceForms";

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

const profileForm = [
    {
        label: "Basic",
        children: [
            {
                label: "First Name",
                identifier: "firstName",
                type: "text",
                required: true,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The first name of the user.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Last Name",
                identifier: "lastName",
                type: "text",
                required: true,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The last name of the user.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Email Address",
                identifier: "emailAddress",
                type: "email_address",
                required: true,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The email address of the account.",
                multipleValues: true,
                defaultValue: "",
            },
            {
                label: "Phone Number",
                identifier: "phoneNumber",
                type: "phone_number",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The phone number of the account.",
                multipleValues: true,
                defaultValue: "",
            },
        ],
    },
];

const companyForm = [
    {
        label: "Basic",
        children: [
            {
                label: "Name",
                identifier: "name",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The name of the company.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Email Address",
                identifier: "emailAddress",
                type: "email_address",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The email address of the account.",
                multipleValues: true,
                defaultValue: "",
            },
            {
                label: "Phone Number",
                identifier: "phoneNumber",
                type: "phone_number",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The phone number of the account.",
                multipleValues: true,
                defaultValue: "",
            },
            {
                label: "Address Line 1",
                identifier: "addressLine1",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The first line of address.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Address Line 2",
                identifier: "addressLine2",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The first line of address.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "City",
                identifier: "city",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The city.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "State",
                identifier: "state",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The state where the customer resides.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Country",
                identifier: "country",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The country where the customer resides.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Zip Code",
                identifier: "zipCode",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip:
                    "The zip code of the location where the customer resides.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Website",
                identifier: "website",
                type: "text",
                required: false,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The website of the company.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Industry",
                identifier: "industry",
                type: "select",
                options: [
                    {
                        value: "business_service",
                        title: "Business Service",
                    },
                    {
                        value: "computer_software",
                        title: "Computer Software",
                    },
                    {
                        value: "computer_hardware",
                        title: "Computer Hardware",
                    },
                    {
                        value: "retail",
                        title: "Retail",
                    },
                    {
                        value: "education",
                        title: "Education",
                    },
                    {
                        value: "entertainment",
                        title: "Entertainment",
                    },
                    {
                        value: "finance_real_estate_insurance",
                        title: "Finance, Real Estate, Insurance",
                    },
                    {
                        value: "government",
                        title: "Government",
                    },
                    {
                        value: "healthcare",
                        title: "Healthcare",
                    },
                    {
                        value: "nonprofit",
                        title: "Nonprofit",
                    },
                    {
                        value: "telecommunications",
                        title: "Telecommunications",
                    },
                ],
                required: false,
                readOnly: false,
                quickAdd: true,
                unique: false,
                hidden: false,
                tooltip: "The industry which the company serves.",
                multipleValues: true,
                defaultValue: null,
            },
        ],
    },
];

const securityForm = [
    {
        label: "Basic",
        children: [
            {
                label: "Old Password",
                identifier: "oldPassword",
                type: "password",
                required: true,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The old password of the user.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "New Password",
                identifier: "newPassword",
                type: "password",
                required: true,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The new password of the user.",
                multipleValues: false,
                defaultValue: "",
            },
            {
                label: "Confirm Password",
                identifier: "confirmPassword",
                type: "password",
                required: true,
                readOnly: false,
                quickAdd: false,
                unique: false,
                hidden: false,
                tooltip: "The new password of the user.",
                multipleValues: false,
                defaultValue: "",
            },
        ],
    },
];

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
                                <Tab label="Security" />
                                <Tab label="Company" />
                            </Tabs>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item={true} xs={12} md={10}>
                    <TabPanel value={tabIndex} index={0}>
                        <PreferenceForms groups={profileForm} />
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1}>
                        <PreferenceForms groups={securityForm} />
                    </TabPanel>
                    <TabPanel value={tabIndex} index={2}>
                        <PreferenceForms groups={companyForm} />
                    </TabPanel>
                </Grid>
            </Grid>
        </div>
    );
}
