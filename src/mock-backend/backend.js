import mock from "./mock";
import faker from "faker";

const accounts = [];
const subscriptions = [];
const transactions = [];
const plans = [];

function generateFakeData() {
    for (var i = 0; i < 100; i++) {
        accounts.push({
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
        });
    }
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

mock.onPost("/api/v1/subscriptions").reply((request) => {
    const subscription = JSON.parse(request.data);
    subscription.id = faker.random.uuid();
    subscriptions.push(subscription);

    return [200, subscription];
});

mock.onGet("/api/v1/subscriptions").reply((request) => {
    return [200, subscriptions];
});

mock.onPost("/api/v1/transactions").reply((request) => {
    const transaction = JSON.parse(request.data);
    transaction.id = faker.random.uuid();
    transactions.push(transaction);

    return [200, transaction];
});

mock.onGet("/api/v1/transactions").reply((request) => {
    return [200, transactions];
});

mock.onPost("/api/v1/plans").reply((request) => {
    const plan = JSON.parse(request.data);
    plan.id = faker.random.uuid();
    plans.push(plan);

    return [200, plan];
});

mock.onGet("/api/v1/plans").reply((request) => {
    return [200, plans];
});