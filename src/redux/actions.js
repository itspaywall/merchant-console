import * as ActionTypes from "./actionTypes";
import axios from "axios";

export function newAccount() {
    return {
        type: ActionTypes.NEW_ACCOUNT,
        payload: null,
    };
}

export function editAccount(account) {
    return {
        type: ActionTypes.EDIT_ACCOUNT,
        payload: account,
    };
}

export function newSubscription() {
    return {
        type: ActionTypes.NEW_SUBSCRIPTION,
        payload: null,
    };
}

export function newInvoice() {
    return {
        type: ActionTypes.NEW_INVOICE,
        payload: null,
    };
}

export function newTransaction() {
    return {
        type: ActionTypes.NEW_TRANSACTION,
        payload: null,
    };
}

export function newPlan() {
    return {
        type: ActionTypes.NEW_PLAN,
        payload: null,
    };
}

export function closeDialog() {
    return {
        type: ActionTypes.CLOSE_DIALOG,
        payload: null,
    };
}

export function showNotification(message, category) {
    return {
        type: ActionTypes.SHOW_NOTIFICATION,
        payload: {
            message,
            category,
        },
    };
}

export function closeNotification() {
    return {
        type: ActionTypes.CLOSE_NOTIFICATION,
        payload: null,
    };
}

// TODO: Error boundaries
export function createAccount(account) {
    return (dispatch) => {
        dispatch(showNotification("Saving account...", "LOADING"));
        return axios.post("/api/v1/accounts", account).then((response) => {
            // const account = response.data;
            dispatch(
                showNotification("Successfully created account", "SUCCESS")
            );
        });
    };
}

export function saveAccount(account) {
    return (dispatch) => {
        dispatch(showNotification("Saving account...", "LOADING"));
        return axios
            .put("/api/v1/accounts/" + account.identifier, account)
            .then((response) => {
                const account = response.data;
                dispatch(fetchAccountComplete(account));
                dispatch(
                    showNotification("Successfully saved account", "SUCCESS")
                );
            });
    };
}

export function createSubscription(subscription) {
    return (dispatch) => {
        dispatch(showNotification("Saving subscription...", "LOADING"));
        return axios
            .post("/api/v1/subscriptions", subscription)
            .then((response) => {
                // const newSubscription = response.data;
                dispatch(
                    showNotification(
                        "Successfully created a subscription",
                        "SUCCESS"
                    )
                );
            });
    };
}

export function createTransaction(transaction) {
    return (dispatch) => {
        dispatch(showNotification("Saving transaction...", "LOADING"));
        return axios
            .post("/api/v1/transactions", transaction)
            .then((response) => {
                // const newPlan = response.data;
                dispatch(
                    showNotification(
                        "Successfully created a transaction",
                        "SUCCESS"
                    )
                );
            });
    };
}

export function createPlan(plan) {
    return (dispatch) => {
        dispatch(showNotification("Saving plan...", "LOADING"));
        return axios.post("/api/v1/plans", plan).then((response) => {
            // const newPlan = response.data;
            dispatch(
                showNotification("Successfully created a plan", "SUCCESS")
            );
        });
    };
}

export function fetchAccountsComplete(accounts) {
    return {
        type: ActionTypes.FETCH_ACCOUNTS_COMPLETE,
        payload: accounts,
    };
}

export function fetchAccounts() {
    return (dispatch) => {
        // dispatch(showNotification('Loading accounts...', 'LOADING'));
        return axios.get("/api/v1/accounts").then((response) => {
            const accounts = response.data;
            dispatch(fetchAccountsComplete(accounts));
        });
    };
}

export function fetchSubscriptionsComplete(subscriptions) {
    return {
        type: ActionTypes.FETCH_SUBSCRIPTIONS_COMPLETE,
        payload: subscriptions,
    };
}

export function fetchSubscriptions() {
    return (dispatch) => {
        // dispatch(showNotification('Loading subscriptions...', 'LOADING'));
        return axios.get("/api/v1/subscriptions").then((response) => {
            const subscriptions = response.data;
            dispatch(fetchSubscriptionsComplete(subscriptions));
        });
    };
}

export function fetchAccount(identifier) {
    return (dispatch) => {
        // dispatch(showNotification('Loading account...', 'LOADING'));
        console.log("/api/v1/accounts/" + identifier);
        return axios.get("/api/v1/accounts/" + identifier).then((response) => {
            const account = response.data;
            dispatch(fetchAccountComplete(account));
        });
    };
}

export function fetchAccountComplete(account) {
    return {
        type: ActionTypes.FETCH_ACCOUNT_COMPLETE,
        payload: account,
    };
}

export function clearAccount() {
    return {
        type: ActionTypes.CLEAR_ACCOUNT,
        payload: null,
    };
}
