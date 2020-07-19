import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import faker from "faker";

import WorkspaceToolbar from "../common/WorkspaceToolbar";
import SubscriptionCard from "../subscription/SubscriptionCard";
import AccountCard from "./AccountCard";
import * as actions from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 16,
    },
    accountCard: {
        maxWidth: 600,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 16,
        fontWeight: 500,
    },
    subscriptions: {},
}));

const subscriptions = [
    {
        identifier: "1",
        currentPeriod: "May 03 1999 — May 19 1999",
        plan: "Premium",
        status: "trial",
        termBehavior: "Renews",
        collection: "Manual",
        renewsOn: "May 03 1999, 3:36 AM",
        startedOn: "May 19 1999, 3:36 AM",
        pricePerUnit: "100 INR",
        estimatedTotal: "200 INR",
    },
    {
        identifier: "2",
        currentPeriod: "May 03 1999 — May 19 1999",
        plan: "Platinum",
        status: "active",
        termBehavior: "Renews",
        collection: "Manual",
        renewsOn: "May 03 1999, 3:36 AM",
        startedOn: "May 19 1999, 3:36 AM",
        pricePerUnit: "100 INR",
        estimatedTotal: "200 INR",
    },
];

/*
const account = {
    id: faker.random.uuid(),
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    companyName: faker.company.companyName(),
    position: faker.name.jobTitle(),
    emailAddress: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    addressLine1: faker.address.streetAddress(),
    addressLine2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    zipCode: faker.address.zipCode(),
};*/

// TODO: WorkspaceToolbar should be renamed to WorkspaceToolbar.
// Further, it should allow us to specify custom buttons.
function ViewAccount(props) {
    const classes = useStyles();
    const handleEditAccount = () => {};
    const { fetchAccount, account } = props;
    const { identifier } = useParams();

    useEffect(() => {
        fetchAccount(identifier);
    }, [identifier, fetchAccount]);

    return (
        <div>
            <WorkspaceToolbar title="Account" />
            {!account && <CircularProgress />}
            {account && (
                <div className={classes.container}>
                    <div className={classes.section}>
                        <Typography
                            variant="h2"
                            className={classes.sectionTitle}
                        >
                            General
                        </Typography>
                        <AccountCard
                            className={classes.accountCard}
                            onEdit={handleEditAccount}
                            {...account}
                        />
                    </div>

                    <div className={classes.section}>
                        <Typography
                            variant="h2"
                            className={classes.sectionTitle}
                        >
                            Subscriptions
                        </Typography>
                        <Grid
                            container={true}
                            className={classes.subscriptions}
                            spacing={2}
                        >
                            {subscriptions.map((subscription) => (
                                <Grid
                                    key={subscription.identifier}
                                    item={true}
                                    lg={4}
                                >
                                    <SubscriptionCard
                                        currentPeriod={
                                            subscription.currentPeriod
                                        }
                                        plan={subscription.plan}
                                        status={subscription.status}
                                        termBehavior={subscription.termBehavior}
                                        collection={subscription.collection}
                                        renewsOn={subscription.renewsOn}
                                        startedOn={subscription.startedOn}
                                        pricePerUnit={subscription.pricePerUnit}
                                        estimatedTotal={
                                            subscription.estimatedTotal
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
            )}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        account: state.account,
    };
}

const mapDispatchToProps = {
    fetchAccount: actions.fetchAccount,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewAccount));
