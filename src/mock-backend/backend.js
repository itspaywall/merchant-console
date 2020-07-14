import mock from './mock';
import faker from 'faker';

const accounts = [];

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
			zipCode: faker.address.zipCode()

		});
	}
	console.log(accounts);
}

generateFakeData();

mock.onPost('/api/v1/accounts').reply(request => {
	const account = JSON.parse(request.data);
	account.id = faker.random.uuid();
	accounts.push(account);

	return [ 200, account ];
});