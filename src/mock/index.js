import faker from "faker";
import { format } from "date-fns";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const mock = new MockAdapter(axios, { delayResponse: 1000 });

const DEFAULT_PLANS = 10;
const DEFAULT_ACCOUNTS = 100;
const DEFAULT_SUBSCRIPTIONS = 100 * 5;

const plans = [];
const accounts = [];
const subscriptions = [];

const periodUnits = ["days", "months"];

function pastDate() {
    return format(faker.date.past(), "yyyy/MM/dd");
}

function soonDate() {
    return format(faker.date.future(), "yyyy/MM/dd");
}

// TODO: We could improve periods generated to be more realistic for months.
function createPlan() {
    const plan = {
        identifier: faker.random.uuid(),
        name: faker.company.bsAdjective() + " " + faker.commerce.productName(),
        code: faker.lorem.word(),
        description: faker.lorem.paragraph(),
        billingPeriod: faker.random.number({
            min: 0,
            max: 6 * 30,
        }),
        billingPeriodUnit: faker.random.arrayElement(periodUnits),
        pricePerBillingPeriod: faker.random.number(),
        setupFee: faker.random.number(),
        trialPeriod: faker.random.number({
            min: 0,
            max: 6 * 30,
        }),
        trialPeriodUnit: faker.random.arrayElement(periodUnits),
        starts: soonDate(),
        term: faker.random.number({
            min: 0,
            max: 6 * 30,
        }),
        termUnit: faker.random.arrayElement(periodUnits),
        renew: faker.random.boolean(),
        createdOn: pastDate(),
    };
    return plan;
}

function createAccount() {
    const account = {
        identifier: faker.random.uuid(),
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
        subscriptions: [],
        createdOn: pastDate(),
    };
    return account;
}

/* Subscriptions can have different values from the plans they are associated with.
 * In other words, a plan is a template from which we create a subscription. However,
 * when we generate a fake subscription here, we do not change the values. In the
 * future, we may want to introduce this behavior.
 *
 * Technically, Hubble does not allow an account to hold multiple subscriptions to
 * the same plan. We do not enforce such complex behavior here.
 */
function createSubscription() {
    const plan = faker.random.arrayElement(plans);
    const account = faker.random.arrayElement(accounts);
    const accountCopy = { ...account };
    delete accountCopy.subscriptions;

    const subscription = {
        identifier: faker.random.uuid(),
        plan: plan,
        account: accountCopy,
        billingPeriod: plan.billingPeriod,
        billingPeriodUnit: plan.billingPeriodUnit,
        setupFee: plan.setupFee,
        trialPeriod: plan.trialPeriod,
        trialPeriodUnit: plan.trialPeriodUnit,
        starts: plan.starts,
        term: plan.term,
        termUnit: plan.termUnit,
        renew: plan.renew,
        createdOn: pastDate(),
    };

    account.subscriptions.push(subscription);

    return subscription;
}

function generateFakeData() {
    for (let i = 0; i < DEFAULT_PLANS; i++) {
        const plan = createPlan();
        plans.push(plan);
    }

    for (let i = 0; i < DEFAULT_ACCOUNTS; i++) {
        const account = createAccount();
        accounts.push(account);
    }

    for (let i = 0; i < DEFAULT_SUBSCRIPTIONS; i++) {
        const subscription = createSubscription();
        subscriptions.push(subscription);
    }

    console.log("[plans]");
    console.log(plans);

    console.log("[accounts]");
    console.log(accounts);

    console.log("[subscriptions]");
    console.log(subscriptions);
}

generateFakeData();

// Plans

mock.onPost("/api/v1/plans").reply((request) => {
    const plan = JSON.parse(request.data);
    plan.id = faker.random.uuid();
    plans.push(plan);

    return [200, plan];
});

// TODO: Paging
mock.onGet("/api/v1/plans").reply((request) => {
    return [200, plans];
});

const GET_PLAN_URL = /\/api\/v1\/plans\/([a-zA-Z0-0-]+)/;
mock.onGet(GET_PLAN_URL).reply((request) => {
    const identifier = GET_PLAN_URL.exec(request.url)[0];
    const plan = plans.find((plan) => plan.identifier === identifier);
    if (plan) {
        return [200, plan];
    } else {
        return [404];
    }
});

// Accounts

mock.onPost("/api/v1/accounts").reply((request) => {
    const account = JSON.parse(request.data);
    account.id = faker.random.uuid();
    accounts.push(account);

    return [200, account];
});

// TODO: Paging
mock.onGet("/api/v1/accounts").reply((request) => {
    return [200, accounts];
});

const GET_ACCOUNT_URL = /\/api\/v1\/accounts\/([a-zA-Z0-0-]+)/;
mock.onGet(GET_ACCOUNT_URL).reply((request) => {
    const identifier = GET_ACCOUNT_URL.exec(request.url)[0];
    let account = accounts.find((account) => account.identifier === identifier);

    if (account) {
        // TODO: Solve the recursive problem.
        delete account.subscriptions;
        return [200, account];
    } else {
        return [404];
    }
});

// Subscriptions

mock.onPost("/api/v1/subscriptions").reply((request) => {
    const subscription = JSON.parse(request.data);
    subscription.id = faker.random.uuid();
    subscription.push(subscription);

    return [200, subscription];
});

// TODO: Paging
mock.onGet("/api/v1/subscriptions").reply((request) => {
    return [200, subscriptions];
});

const GET_SUBSCRIPTION_URL = /\/api\/v1\/subscriptions\/([a-zA-Z0-0-]+)/;
mock.onGet(GET_SUBSCRIPTION_URL).reply((request) => {
    const identifier = GET_SUBSCRIPTION_URL.exec(request.url)[0];
    const subscription = subscriptions.find(
        (subscription) => subscription.identifier === identifier
    );
    if (subscription) {
        delete subscription.account;
        return [200, subscription];
    } else {
        return [404];
    }
});
