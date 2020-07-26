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

export function editPlan(plan) {
    return {
        type: ActionTypes.EDIT_PLAN,
        payload: plan,
    };
}

export function editInvoice(invoice) {
    return {
        type: ActionTypes.EDIT_INVOICE,
        payload: invoice,
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

export function saveInvoice(invoice) {
    return (dispatch) => {
        dispatch(showNotification("Saving invoice...", "LOADING"));
        return axios
            .put("/api/v1/invoices/" + invoice.identifier, invoice)
            .then((response) => {
                const invoice = response.data;
                dispatch(fetchInvoiceComplete(invoice));
                dispatch(
                    showNotification("Successfully saved invoice", "SUCCESS")
                );
            });
    };
}

export function savePlan(plan) {
    return (dispatch) => {
        dispatch(showNotification("Saving plan...", "LOADING"));
        return axios
            .put("/api/v1/plans/" + plan.identifier, plan)
            .then((response) => {
                const plan = response.data;
                dispatch(fetchPlanComplete(plan));
                dispatch(
                    showNotification("Successfully saved plan", "SUCCESS")
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

export function fetchPlansComplete(plans) {
    return {
        type: ActionTypes.FETCH_PLANS_COMPLETE,
        payload: plans,
    };
}

export function fetchPlans() {
    return (dispatch) => {
        // dispatch(showNotification('Loading plans...', 'LOADING'));
        return axios.get("/api/v1/plans").then((response) => {
            const plans = response.data;
            dispatch(fetchPlansComplete(plans));
        });
    };
}

export function fetchAccountsComplete(accounts) {
    return {
        type: ActionTypes.FETCH_ACCOUNTS_COMPLETE,
        payload: accounts,
    };
}

export function fetchInvoices() {
    return (dispatch) => {
        // dispatch(showNotification('Loading invoices...', 'LOADING'));
        return axios.get("/api/v1/invoices").then((response) => {
            const invoices = response.data;
            dispatch(fetchInvoicesComplete(invoices));
        });
    };
}

export function fetchInvoicesComplete(invoices) {
    return {
        type: ActionTypes.FETCH_INVOICES_COMPLETE,
        payload: invoices,
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

export function fetchInvoice(identifier) {
    return (dispatch) => {
        // dispatch(showNotification('Loading invoice...', 'LOADING'));
        console.log("/api/v1/invoices/" + identifier);
        return axios.get("/api/v1/invoices/" + identifier).then((response) => {
            const invoice = response.data;
            dispatch(fetchInvoiceComplete(invoice));
        });
    };
}

export function fetchInvoiceComplete(invoice) {
    return {
        type: ActionTypes.FETCH_INVOICE_COMPLETE,
        payload: invoice,
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

export function fetchPlan(identifier) {
    return (dispatch) => {
        // dispatch(showNotification('Loading plan...', 'LOADING'));
        return axios.get("/api/v1/plans/" + identifier).then((response) => {
            const plan = response.data;
            dispatch(fetchPlanComplete(plan));
        });
    };
}

export function fetchPlanComplete(plan) {
    return {
        type: ActionTypes.FETCH_PLAN_COMPLETE,
        payload: plan,
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

export function clearInvoice() {
    return {
        type: ActionTypes.CLEAR_INVOICE,
        payload: null,
    };
}

export function clearPlan() {
    return {
        type: ActionTypes.CLEAR_PLAN,
        payload: null,
    };
}

export function fetchSubscription(identifier) {
    return (dispatch) => {
        // dispatch(showNotification('Loading subscription...', 'LOADING'));
        return axios
            .get("/api/v1/subscriptions/" + identifier)
            .then((response) => {
                const subscription = response.data;
                dispatch(fetchSubscriptionComplete(subscription));
            });
    };
}

export function fetchSubscriptionComplete(subscription) {
    return {
        type: ActionTypes.FETCH_SUBSCRIPTION_COMPLETE,
        payload: subscription,
    };
}

export function clearSubscription() {
    return {
        type: ActionTypes.CLEAR_SUBSCRIPTION,
        payload: null,
    };
}
