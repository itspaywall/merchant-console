import * as ActionTypes from './actionTypes';

export function newAccount() {
	return {
		type: ActionTypes.NEW_ACCOUNT,
		payload: null
	};
}

export function newSubscription() {
	return {
		type: ActionTypes.NEW_SUBSCRIPTION,
		payload: null
	};
}

export function newInvoice() {
	return {
		type: ActionTypes.NEW_INVOICE,
		payload: null
	};
}

export function newPlan() {
	return {
		type: ActionTypes.NEW_PLAN,
		payload: null
	};
}