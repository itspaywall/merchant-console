import mock from "./mock";
import faker from "faker";

const accounts = [];

function generateFakeData() {
<<<<<<< HEAD
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
	console.log(accounts);
=======
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
    console.log(accounts);
>>>>>>> 7771f42... Integrated Prettier format the source files on each commit.
}

generateFakeData();

mock.onPost("/api/v1/accounts").reply((request) => {
<<<<<<< HEAD
	const account = JSON.parse(request.data);
	account.id = faker.random.uuid();
	accounts.push(account);

	return [200, account];
});

mock.onGet('/api/v1/accounts').reply(request => {
	return [ 200, accounts ];
=======
    const account = JSON.parse(request.data);
    account.id = faker.random.uuid();
    accounts.push(account);

    return [200, account];
});

mock.onGet("/api/v1/accounts").reply((request) => {
    return [200, accounts];
>>>>>>> 7771f42... Integrated Prettier format the source files on each commit.
});
