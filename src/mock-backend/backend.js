import mock from "./mock";
import faker from "faker";

const DEFAULT_PLANS = 10;
const DEFAULT_ACCOUNTS = 100;

const plans = [];
const accounts = [];

const periodUnits = ["days", "months"];

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
        term: faker.random.number({
            min: 0,
            max: 6 * 30,
        }),
        termUnit: faker.random.arrayElement(periodUnits),
        renew: faker.random.boolean(),
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
    };
    return account;
}

function generateFakeData() {
    for (let i = 0; i < DEFAULT_PLANS; i++) {
        const plan = createPlan();
        plans.push(plan);
    }
    console.log(plans);

    for (let i = 0; i < DEFAULT_ACCOUNTS; i++) {
        const account = createAccount();
        accounts.push(account);
    }
    console.log(accounts);
}

generateFakeData();

mock.onPost("/api/v1/accounts").reply((request) => {
    const account = JSON.parse(request.data);
    account.id = faker.random.uuid();
    accounts.push(account);

    return [200, account];
});

mock.onGet("/api/v1/accounts").reply((request) => {
    return [200, accounts];
});
