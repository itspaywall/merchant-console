import * as ActionTypes from "./actionTypes";
import axios from "axios";
import { newClient } from "../server/api";
import crossStorage from "../common/crossStorage";

const client = newClient();

/* ACCOUNT
 *  1. newAccount()
 *  2. createAccount()
 *  3. saveAccount()
 *  4. fetchAccountComplete()
 *  5. fetchAccount()
 *  6. fetchAccountsComplete()
 *  7. fetchAccounts()
 *  8. editAccount()
 *  9. clearAccount()
 */

export function newAccount() {
    return {
        type: ActionTypes.NEW_ACCOUNT,
        payload: null,
    };
}

// TODO: Error boundaries
export function createAccount(account) {
    return (dispatch) => {
        dispatch(showNotification("Saving account...", "LOADING"));
        return client.newAccount(account).then((response) => {
            dispatch(fetchAccounts({}));
            dispatch(
                showNotification("Successfully created account", "SUCCESS")
            );
        });
    };
}

export function saveAccount(account) {
    return (dispatch) => {
        dispatch(showNotification("Saving account...", "LOADING"));
        return client.saveAccount(account).then((response) => {
            dispatch(fetchAccounts({}));
            const account = response.data;
            dispatch(fetchAccountComplete(account));
            dispatch(showNotification("Successfully saved account", "SUCCESS"));
        });
    };
}

export function fetchAccountComplete(account) {
    return {
        type: ActionTypes.FETCH_ACCOUNT_COMPLETE,
        payload: account,
    };
}

export function fetchAccount(id) {
    return (dispatch) => {
        // dispatch(showNotification('Loading account...', 'LOADING'));
        return client.getAccount(id).then((response) => {
            const account = response.data;
            dispatch(fetchAccountComplete(account));
        });
    };
}

export function fetchAccountsComplete(accounts) {
    return {
        type: ActionTypes.FETCH_ACCOUNTS_COMPLETE,
        payload: accounts,
    };
}

export function internalRedirect(path) {
    return {
        type: ActionTypes.INTERNAL_REDIRECT,
        payload: path,
    };
}

export function fetchAccounts(params) {
    return async (dispatch) => {
        // dispatch(showNotification('Loading accounts...', 'LOADING'));
        try {
            const response = await client.getAccounts(params);
            const accounts = response.data;
            for (let i = 0; i < accounts.length; i++) {
                const account = accounts[i];
                account.createdAt = new Date(account.createdAt);
            }
            dispatch(fetchAccountsComplete(accounts));
        } catch (error) {
            console.log(error);
            dispatch(internalRedirect("/error/500"));
        }
    };
}

export function editAccount(account) {
    return {
        type: ActionTypes.EDIT_ACCOUNT,
        payload: account,
    };
}

export function clearAccount() {
    return {
        type: ActionTypes.CLEAR_ACCOUNT,
        payload: null,
    };
}

/* SUBSCRIPTION
 *  1. newSubscription()
 *  2. createSubscription()
 *  3. saveSubscription() -> TODO
 *  4. fetchSubscriptionComplete()
 *  5. fetchSubscription()
 *  6. fetchSubscriptionsComplete()
 *  7. fetchSubscriptions()
 *  8. editSubscription() -> TODO
 *  9. clearSubscription()
 */

export function newSubscription() {
    return {
        type: ActionTypes.NEW_SUBSCRIPTION,
        payload: null,
    };
}

export function createSubscription(subscription) {
    return (dispatch) => {
        dispatch(showNotification("Saving subscription...", "LOADING"));
        return client.newSubscription(subscription).then((response) => {
            // const newSubscription = response.data;
            dispatch(
                showNotification("Successfully created subscription", "SUCCESS")
            );
        });
    };
}

export function saveSubscription(subscription) {
    return (dispatch) => {
        dispatch(showNotification("Saving subscription...", "LOADING"));
        return client.saveSubscription(subscription).then((response) => {
            const subscription = response.data;
            dispatch(fetchSubscriptionComplete(subscription));
            dispatch(
                showNotification("Successfully saved subscription", "SUCCESS")
            );
        });
    };
}

export function fetchSubscriptionComplete(subscription) {
    return {
        type: ActionTypes.FETCH_SUBSCRIPTION_COMPLETE,
        payload: subscription,
    };
}

export function fetchSubscription(id) {
    return (dispatch) => {
        // dispatch(showNotification('Loading subscription...', 'LOADING'));
        return client.getSubscription(id).then((response) => {
            const subscription = response.data;
            dispatch(fetchSubscriptionComplete(subscription));
        });
    };
}

export function fetchSubscriptionsComplete(subscriptions) {
    return {
        type: ActionTypes.FETCH_SUBSCRIPTIONS_COMPLETE,
        payload: subscriptions,
    };
}

export function fetchSubscriptions(params) {
    return (dispatch) => {
        // dispatch(showNotification('Loading subscriptions...', 'LOADING'));
        return client.getSubscriptions(params).then((response) => {
            const subscriptions = response.data;
            for (let i = 0; i < subscriptions.length; i++) {
                const subscription = subscriptions[i];
                subscription.createdOn = new Date(subscription.createdOn);
            }
            dispatch(fetchSubscriptionsComplete(subscriptions));
        });
    };
}

export function editSubscription(subscription) {
    return {
        type: ActionTypes.EDIT_SUBSCRIPTION,
        payload: subscription,
    };
}

export function clearSubscription() {
    return {
        type: ActionTypes.CLEAR_SUBSCRIPTION,
        payload: null,
    };
}

/* INVOICE
 *  1. newInvoice()
 *  2. createInvoice() -> TODO
 *  3. saveInvoice()
 *  4. fetchInvoiceComplete()
 *  5. fetchInvoice()
 *  6. fetchInvoicesComplete()
 *  7. fetchInvoices()
 *  8. editInvoice()
 *  9. clearInvoice()
 */

export function newInvoice() {
    return {
        type: ActionTypes.NEW_INVOICE,
        payload: null,
    };
}

export function saveInvoice(invoice) {
    return (dispatch) => {
        dispatch(showNotification("Saving invoice...", "LOADING"));
        return client.saveInvoice(invoice).then((response) => {
            const invoice = response.data;
            dispatch(fetchInvoiceComplete(invoice));
            dispatch(showNotification("Successfully saved invoice", "SUCCESS"));
        });
    };
}

export function fetchInvoiceComplete(invoice) {
    return {
        type: ActionTypes.FETCH_INVOICE_COMPLETE,
        payload: invoice,
    };
}

export function fetchInvoice(id) {
    return (dispatch) => {
        // dispatch(showNotification('Loading invoice...', 'LOADING'));
        return client.getInvoice(id).then((response) => {
            const invoice = response.data;
            dispatch(fetchInvoiceComplete(invoice));
        });
    };
}

export function fetchInvoicesComplete(invoices) {
    return {
        type: ActionTypes.FETCH_INVOICES_COMPLETE,
        payload: invoices,
    };
}

export function fetchInvoices(params) {
    return (dispatch) => {
        // dispatch(showNotification('Loading invoices...', 'LOADING'));
        return client.getInvoices(params).then((response) => {
            const invoices = response.data;
            for (let i = 0; i < invoices.length; i++) {
                const invoice = invoices[i];
                invoice.createdOn = new Date(invoice.createdOn);
            }
            dispatch(fetchInvoicesComplete(invoices));
        });
    };
}

export function editInvoice(invoice) {
    return {
        type: ActionTypes.EDIT_INVOICE,
        payload: invoice,
    };
}

export function clearInvoice() {
    return {
        type: ActionTypes.CLEAR_INVOICE,
        payload: null,
    };
}

/* TRANSACTION
 *  1. newTransaction()
 *  2. createTransaction()
 *  3. saveTransaction()
 *  4. fetchTransactionComplete()
 *  5. fetchTransaction()
 *  6. fetchTransactionsComplete()
 *  7. fetchTransactions()
 *  8. editTransaction()
 *  9. clearTransaction()
 */

export function newTransaction() {
    return {
        type: ActionTypes.NEW_TRANSACTION,
        payload: null,
    };
}

export function createTransaction(transaction) {
    return (dispatch) => {
        dispatch(showNotification("Saving transaction...", "LOADING"));
        return client.newTransaction(transaction).then((response) => {
            // const newPlan = response.data;
            dispatch(
                showNotification("Successfully created transaction", "SUCCESS")
            );
        });
    };
}

export function saveTransaction(transaction) {
    return (dispatch) => {
        dispatch(showNotification("Saving transaction...", "LOADING"));
        return client.saveTransaction(transaction).then((response) => {
            const transaction = response.data;
            dispatch(fetchTransactionComplete(transaction));
            dispatch(
                showNotification("Successfully saved transaction", "SUCCESS")
            );
        });
    };
}

export function fetchTransactionComplete(transaction) {
    return {
        type: ActionTypes.FETCH_TRANSACTION_COMPLETE,
        payload: transaction,
    };
}

export function fetchTransaction(id) {
    return (dispatch) => {
        // dispatch(showNotification('Loading transaction...', 'LOADING'));
        return client.getTransaction(id).then((response) => {
            const transaction = response.data;
            dispatch(fetchTransactionComplete(transaction));
        });
    };
}

export function fetchTransactionsComplete(transactions) {
    return {
        type: ActionTypes.FETCH_TRANSACTIONS_COMPLETE,
        payload: transactions,
    };
}

export function fetchTransactions(params) {
    return (dispatch) => {
        // dispatch(showNotification('Loading transactions...', 'LOADING'));
        return client.getTransactions(params).then((response) => {
            const transactions = response.data;
            for (let i = 0; i < transactions.length; i++) {
                const transaction = transactions[i];
                transaction.createdOn = new Date(transaction.createdOn);
            }
            dispatch(fetchTransactionsComplete(transactions));
        });
    };
}

export function editTransaction(transaction) {
    return {
        type: ActionTypes.EDIT_TRANSACTION,
        payload: transaction,
    };
}

export function clearTransaction() {
    return {
        type: ActionTypes.CLEAR_TRANSACTION,
        payload: null,
    };
}

/* PLAN
 *  1. newPlan()
 *  2. createPlan()
 *  3. savePlan()
 *  4. fetchPlanComplete()
 *  5. fetchPlan()
 *  6. fetchPlansComplete()
 *  7. fetchPlans()
 *  8. editPlan()
 *  9. clearPlan()
 */

export function newPlan() {
    return {
        type: ActionTypes.NEW_PLAN,
        payload: null,
    };
}

export function createPlan(plan) {
    return (dispatch) => {
        dispatch(showNotification("Saving plan...", "LOADING"));
        return client.newPlan(plan).then((response) => {
            // const newPlan = response.data;
            dispatch(showNotification("Successfully created plan", "SUCCESS"));
        });
    };
}

export function savePlan(plan) {
    return (dispatch) => {
        dispatch(showNotification("Saving plan...", "LOADING"));
        return client.savePlan(plan).then((response) => {
            const plan = response.data;
            dispatch(fetchPlanComplete(plan));
            dispatch(showNotification("Successfully saved plan", "SUCCESS"));
        });
    };
}

export function fetchPlanComplete(plan) {
    return {
        type: ActionTypes.FETCH_PLAN_COMPLETE,
        payload: plan,
    };
}

export function fetchPlan(id) {
    return (dispatch) => {
        // dispatch(showNotification('Loading plan...', 'LOADING'));
        return client.getPlan(id).then((response) => {
            const plan = response.data;
            dispatch(fetchPlanComplete(plan));
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
        return client.getPlans({}).then((response) => {
            const plans = response.data;
            dispatch(fetchPlansComplete(plans));
        });
    };
}

export function editPlan(plan) {
    return {
        type: ActionTypes.EDIT_PLAN,
        payload: plan,
    };
}

export function clearPlan() {
    return {
        type: ActionTypes.CLEAR_PLAN,
        payload: null,
    };
}

/* Analytics */

export function fetchAnalyticsComplete(analytics) {
    return {
        type: ActionTypes.FETCH_ANALYTICS_COMPLETE,
        payload: analytics,
    };
}

export function fetchAnalytics(params) {
    return (dispatch) => {
        return axios.get("/api/v1/analytics", { params }).then((response) => {
            const analytics = response.data;
            dispatch(fetchAnalyticsComplete(analytics));
        });
    };
}

/* MISC
 * 1. closeDialog
 * 2. showNotification
 * 3. closeNotification
 */

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

export function fetchUserComplete(user) {
    return {
        type: ActionTypes.FETCH_USER_COMPLETE,
        payload: user,
    };
}

export function fetchUserFailed() {
    return {
        type: ActionTypes.FETCH_USER_FAILED,
        payload: null,
    };
}

export function fetchUser() {
    return async (dispatch) => {
        let user = null;
        try {
            const csClient = await crossStorage.connection;
            user = JSON.parse(await csClient.get("user"));
            axios.defaults.headers.common = {
                Authorization: `bearer ${user.accessToken}`,
            };
        } catch (error) {
            console.log(error);
        }

        dispatch(user ? fetchUserComplete(user) : fetchUserFailed());
    };
}

export function logout() {
    return async (dispatch) => {
        try {
            const csClient = await crossStorage.connection;
            await csClient.del("user");
        } catch (error) {
            console.log(error);
        }
        /* Redirect the user to the login page. */
        dispatch(fetchUserComplete(null));
    };
}
