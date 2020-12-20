/*
 * Copyright 2017-2020 Samuel Rowe, Joel E. Rego
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as ActionTypes from "./actionTypes";
import axios from "axios";
import { newClient } from "../server/api";
import crossStorage from "../common/crossStorage";

const client = newClient();

function handleError(dispatch, error, message) {
    /* By default, if an instance of the Error class is printed, a lot of information is hidden.
     * Therefore, we convert it to a regular object and then print it.
     */
    console.log(error);
    console.log(JSON.parse(JSON.stringify(error)));
    let action;
    if (error.response) {
        // Assuming that we receive a JSON.
        action = showNotification(
            error.response.data.message || message,
            "ERROR"
        );
    } else {
        action = showNotification(message, "ERROR");
    }
    dispatch(action);
}

export function newAPIKey() {
    return {
        type: ActionTypes.NEW_API_KEY,
        payload: null,
    };
}

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
    return async (dispatch) => {
        try {
            dispatch(showNotification("Saving account...", "LOADING"));
            await client.newAccount(account);
            dispatch(fetchAccounts({}));
            dispatch(
                showNotification("Successfully created account", "SUCCESS")
            );
        } catch (error) {
            handleError(dispatch, error, "Failed to create account");
        }
    };
}

export function saveAccount(account) {
    return async (dispatch) => {
        try {
            dispatch(showNotification("Saving account...", "LOADING"));
            const newAccount = await client.saveAccount(account);
            dispatch(fetchAccounts({}));
            dispatch(fetchAccountComplete(newAccount));
            dispatch(showNotification("Successfully saved account", "SUCCESS"));
        } catch (error) {
            handleError(dispatch, error, "Failed to save account");
        }
    };
}

export function fetchAccountComplete(account) {
    return {
        type: ActionTypes.FETCH_ACCOUNT_COMPLETE,
        payload: account,
    };
}

export function fetchAccount(id) {
    return async (dispatch) => {
        try {
            // dispatch(showNotification('Loading account...', 'LOADING'));
            const account = await client.getAccount(id);
            dispatch(fetchAccountComplete(account));
        } catch (error) {
            handleError(dispatch, error, "Failed to fetch account");
        }
    };
}

export function fetchAccountsComplete(accounts) {
    return {
        type: ActionTypes.FETCH_ACCOUNTS_COMPLETE,
        payload: accounts,
    };
}

export function fetchAccounts(params) {
    return async (dispatch) => {
        try {
            // dispatch(showNotification('Loading accounts...', 'LOADING'));
            const accounts = await client.getAccounts(params);
            dispatch(fetchAccountsComplete(accounts));
        } catch (error) {
            handleError(dispatch, error, "Failed to fetch accounts");
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
    return async (dispatch) => {
        try {
            dispatch(showNotification("Saving subscription...", "LOADING"));
            await client.newSubscription(subscription);
            dispatch(fetchSubscriptions({}));
            dispatch(
                showNotification("Successfully created subscription", "SUCCESS")
            );
        } catch (error) {
            handleError(dispatch, error, "Failed to create subscription.");
        }
    };
}

export function saveSubscription(subscription) {
    return async (dispatch) => {
        try {
            dispatch(showNotification("Saving subscription...", "LOADING"));
            const newSubscription = await client.saveSubscription(subscription);
            dispatch(fetchSubscriptions());
            dispatch(fetchSubscriptionComplete(newSubscription));
            dispatch(
                showNotification("Successfully saved subscription", "SUCCESS")
            );
        } catch (error) {
            handleError(dispatch, error, "Failed to save subscription");
        }
    };
}

export function fetchSubscriptionComplete(subscription) {
    return {
        type: ActionTypes.FETCH_SUBSCRIPTION_COMPLETE,
        payload: subscription,
    };
}

export function fetchSubscription(id) {
    return async (dispatch) => {
        try {
            // dispatch(showNotification('Loading subscription...', 'LOADING'));
            const subscription = await client.getSubscription(id);
            dispatch(fetchSubscriptionComplete(subscription));
        } catch (error) {
            handleError(dispatch, error, "Failed to fetch subscription");
        }
    };
}

export function fetchSubscriptionsComplete(subscriptions) {
    return {
        type: ActionTypes.FETCH_SUBSCRIPTIONS_COMPLETE,
        payload: subscriptions,
    };
}

export function fetchSubscriptions(params) {
    return async (dispatch) => {
        try {
            const subscriptions = await client.getSubscriptions(params);
            dispatch(fetchSubscriptionsComplete(subscriptions));
        } catch (error) {
            handleError(dispatch, error, "Failed to fetch subscriptions");
        }
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
    return async (dispatch) => {
        try {
            dispatch(showNotification("Saving invoice...", "LOADING"));
            const newInvoice = await client.saveInvoice(invoice);
            dispatch(fetchInvoices({})); // BUG: This action does not acknowledge the filters.
            dispatch(fetchInvoiceComplete(newInvoice));
            dispatch(showNotification("Successfully saved invoice", "SUCCESS"));
        } catch (error) {
            handleError(dispatch, error, "Failed to save invoice");
        }
    };
}

export function fetchInvoiceComplete(invoice) {
    return {
        type: ActionTypes.FETCH_INVOICE_COMPLETE,
        payload: invoice,
    };
}

export function fetchInvoice(id) {
    return async (dispatch) => {
        try {
            // dispatch(showNotification('Loading invoice...', 'LOADING'));
            const invoice = await client.getInvoice(id);
            dispatch(fetchInvoiceComplete(invoice));
        } catch (error) {
            handleError(dispatch, error, "Failed to fetch invoice");
        }
    };
}

export function fetchInvoicesComplete(invoices) {
    return {
        type: ActionTypes.FETCH_INVOICES_COMPLETE,
        payload: invoices,
    };
}

export function fetchInvoices(params) {
    return async (dispatch) => {
        try {
            // dispatch(showNotification('Loading invoices...', 'LOADING'));
            const invoices = await client.getInvoices(params);
            dispatch(fetchInvoicesComplete(invoices));
        } catch (error) {
            handleError(dispatch, error, "Failed to fetch invoices");
        }
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
    return async (dispatch) => {
        try {
            dispatch(showNotification("Saving transaction...", "LOADING"));
            await client.newTransaction(transaction);
            dispatch(fetchTransactions({}));
            dispatch(
                showNotification("Successfully created transaction", "SUCCESS")
            );
        } catch (error) {
            handleError(dispatch, error, "Failed to create transaction");
        }
    };
}

export function saveTransaction(transaction) {
    return async (dispatch) => {
        try {
            dispatch(showNotification("Saving transaction...", "LOADING"));
            const newTransaction = await client.saveTransaction(transaction);
            dispatch(fetchTransactions({})); // BUG: This action does not acknowledge the filters.
            dispatch(fetchTransactionComplete(newTransaction));
            dispatch(
                showNotification("Successfully saved transaction", "SUCCESS")
            );
        } catch (error) {
            handleError(dispatch, error, "Failed to save transaction");
        }
    };
}

export function fetchTransactionComplete(transaction) {
    return {
        type: ActionTypes.FETCH_TRANSACTION_COMPLETE,
        payload: transaction,
    };
}

export function fetchTransaction(id) {
    return async (dispatch) => {
        const transaction = await client.getTransaction(id);
        dispatch(fetchTransactionComplete(transaction));
    };
}

export function fetchTransactionsComplete(transactions) {
    return {
        type: ActionTypes.FETCH_TRANSACTIONS_COMPLETE,
        payload: transactions,
    };
}

export function fetchTransactions(params) {
    return async (dispatch) => {
        try {
            const transactions = await client.getTransactions(params);
            dispatch(fetchTransactionsComplete(transactions));
        } catch (error) {
            handleError(dispatch, error, "Failed to fetch transactions");
        }
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
    return async (dispatch) => {
        try {
            dispatch(showNotification("Saving plan...", "LOADING"));
            await client.newPlan(plan);
            dispatch(fetchPlans({}));
            dispatch(showNotification("Successfully created plan", "SUCCESS"));
        } catch (error) {
            handleError(dispatch, error, "Failed to create plan");
        }
    };
}

export function savePlan(plan) {
    return async (dispatch) => {
        try {
            dispatch(showNotification("Saving plan...", "LOADING"));
            const newPlan = await client.savePlan(plan);
            dispatch(fetchPlans({}));
            dispatch(fetchPlanComplete(newPlan));
            dispatch(showNotification("Successfully saved plan", "SUCCESS"));
        } catch (error) {
            handleError(dispatch, error, "Failed to save plan");
        }
    };
}

export function fetchPlanComplete(plan) {
    return {
        type: ActionTypes.FETCH_PLAN_COMPLETE,
        payload: plan,
    };
}

export function fetchPlan(id) {
    return async (dispatch) => {
        try {
            // dispatch(showNotification('Loading plan...', 'LOADING'));
            const plan = await client.getPlan(id);
            dispatch(fetchPlanComplete(plan));
        } catch (error) {
            handleError(dispatch, error, "Failed to save plan");
        }
    };
}

export function fetchPlansComplete(plans) {
    return {
        type: ActionTypes.FETCH_PLANS_COMPLETE,
        payload: plans,
    };
}

export function fetchPlans(params) {
    return async (dispatch) => {
        try {
            const plans = await client.getPlans(params);
            dispatch(fetchPlansComplete(plans));
        } catch (error) {
            handleError(dispatch, error, "Failed to fetch plans");
        }
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
    return async (dispatch) => {
        try {
            const response = await axios.get("/api/v1/analytics", { params });
            const analytics = response.data;
            dispatch(fetchAnalyticsComplete(analytics));
        } catch (error) {
            handleError(dispatch, error, "Failed to fetch analytics data");
        }
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
            handleError(dispatch, error, "Cannot find an active user session.");
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
            handleError(dispatch, error, "Failed to logout!");
        }
        /* Redirect the user to the login page. */
        dispatch(fetchUserComplete(null));
    };
}

export function internalRedirect(path) {
    return {
        type: ActionTypes.INTERNAL_REDIRECT,
        payload: path,
    };
}
