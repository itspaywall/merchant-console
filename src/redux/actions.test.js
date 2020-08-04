import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import {
    mock as mockBackend,
    plans,
    accounts,
    subscriptions,
    transactions,
    invoices,
} from "../mock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("account actions", () => {
    afterEach(() => {
        mockBackend.resetHistory();
    });

    it("should create an action to open new account dialog", () => {
        const expectedAction = {
            type: actionTypes.NEW_ACCOUNT,
            payload: null,
        };
        const actualAction = actions.newAccount();
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to create a new account", () => {
        const account = {};
        const expectedActions = [
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Saving account...",
                    category: "LOADING",
                },
            },
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Successfully created account",
                    category: "SUCCESS",
                },
            },
        ];
        const store = mockStore({});
        const asyncAction = actions.createAccount(account);

        return store.dispatch(asyncAction).then(() => {
            const history = mockBackend.history;
            const actualActions = store.getActions();

            expect(actualActions).toEqual(expectedActions);
            expect(history.post.length).toBe(1);
            expect(history.post[0].data).toBe(JSON.stringify(account));
            expect(history.post[0].url).toBe("/api/v1/accounts");
        });
    });

    it("should create an action to save an existing account", () => {
        const account = accounts[0];
        const expectedActions = [
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Saving account...",
                    category: "LOADING",
                },
            },
            {
                type: actionTypes.FETCH_ACCOUNT_COMPLETE,
                payload: account,
            },
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Successfully saved account",
                    category: "SUCCESS",
                },
            },
        ];
        const store = mockStore({});
        const asyncAction = actions.saveAccount(account);

        return store.dispatch(asyncAction).then(() => {
            const history = mockBackend.history;
            const actualActions = store.getActions();

            expect(actualActions).toEqual(expectedActions);
            expect(history.put.length).toBe(1);
            expect(history.put[0].data).toBe(JSON.stringify(account));
            expect(history.put[0].url).toBe(
                "/api/v1/accounts/" + account.identifier
            );
        });
    });

    it("should create an action to notify account fetch completion", () => {
        const account = {};
        const expectedAction = {
            type: actionTypes.FETCH_ACCOUNT_COMPLETE,
            payload: account,
        };
        const actualAction = actions.fetchAccountComplete(account);
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to fetch an account", () => {
        const identifier = accounts[0].identifier;
        /* The payload could either be an account or null (in case not found).
         * Therefore, we do not test the payload.
         */
        const expectedActionType = actionTypes.FETCH_ACCOUNT_COMPLETE;
        const store = mockStore({});
        const asyncAction = actions.fetchAccount(identifier);

        return store.dispatch(asyncAction).then(() => {
            const actualActions = store.getActions();
            expect(actualActions.length).toBe(1);
            expect(actualActions[0].type).toBe(expectedActionType);

            const history = mockBackend.history;
            expect(history.get.length).toBe(1);
            expect(history.get[0].url).toBe("/api/v1/accounts/" + identifier);
        });
    });

    it("should create an action to notify completion of fetching accounts", () => {
        const accounts = [];
        const expectedAction = {
            type: actionTypes.FETCH_ACCOUNTS_COMPLETE,
            payload: [],
        };
        const actualAction = actions.fetchAccountsComplete(accounts);
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to fetch accounts", () => {
        /* The order is important. Otherwise, the query string that reaches the mock backend may
         * appear in a different order than what we expect.
         */
        const params = {
            keys1: "value1",
            keys2: "value2",
        };

        /* The payload could either be an account or null (in case not found).
         * Therefore, we do not test the payload.
         */
        const expectedActionType = actionTypes.FETCH_ACCOUNTS_COMPLETE;
        const store = mockStore({});
        const asyncAction = actions.fetchAccounts(params);

        return store.dispatch(asyncAction).then(() => {
            const actualActions = store.getActions();
            expect(actualActions.length).toBe(1);
            expect(actualActions[0].type).toBe(expectedActionType);

            const history = mockBackend.history;
            expect(history.get.length).toBe(1);
            expect(history.get[0].url).toBe("/api/v1/accounts");
            expect(history.get[0].params).toEqual(params);
        });
    });

    it("should create an action to edit an account", () => {
        const account = {};
        const expectedAction = {
            type: actionTypes.EDIT_ACCOUNT,
            payload: account,
        };
        const actualAction = actions.editAccount(account);
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to clear an account from the store", () => {
        const expectedAction = {
            type: actionTypes.CLEAR_ACCOUNT,
            payload: null,
        };
        const actualAction = actions.clearAccount();
        expect(actualAction).toEqual(expectedAction);
    });
});

describe("subscription actions", () => {
    afterEach(() => {
        mockBackend.resetHistory();
    });

    it("should create an action to open new subscription dialog", () => {
        const expectedAction = {
            type: actionTypes.NEW_SUBSCRIPTION,
            payload: null,
        };
        const actualAction = actions.newSubscription();
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to create a new subscription", () => {
        const subscription = {};
        const expectedActions = [
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Saving subscription...",
                    category: "LOADING",
                },
            },
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Successfully created subscription",
                    category: "SUCCESS",
                },
            },
        ];
        const store = mockStore({});
        const asyncAction = actions.createSubscription(subscription);

        return store.dispatch(asyncAction).then(() => {
            const history = mockBackend.history;
            const actualActions = store.getActions();

            expect(actualActions).toEqual(expectedActions);
            expect(history.post.length).toBe(1);
            expect(history.post[0].data).toBe(JSON.stringify(subscription));
            expect(history.post[0].url).toBe("/api/v1/subscriptions");
        });
    });

    it("should create an action to save an existing subscription", () => {
        const subscription = subscriptions[0];
        const expectedActions = [
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Saving subscription...",
                    category: "LOADING",
                },
            },
            {
                type: actionTypes.FETCH_SUBSCRIPTION_COMPLETE,
                payload: subscription,
            },
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Successfully saved subscription",
                    category: "SUCCESS",
                },
            },
        ];
        const store = mockStore({});
        const asyncAction = actions.saveSubscription(subscription);

        return store.dispatch(asyncAction).then(() => {
            const history = mockBackend.history;
            const actualActions = store.getActions();

            expect(actualActions).toEqual(expectedActions);
            expect(history.put.length).toBe(1);
            expect(history.put[0].data).toBe(JSON.stringify(subscription));
            expect(history.put[0].url).toBe(
                "/api/v1/subscriptions/" + subscription.identifier
            );
        });
    });

    it("should create an action to notify subscription fetch completion", () => {
        const subscription = {};
        const expectedAction = {
            type: actionTypes.FETCH_SUBSCRIPTION_COMPLETE,
            payload: subscription,
        };
        const actualAction = actions.fetchSubscriptionComplete(subscription);
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to fetch a subscription", () => {
        const identifier = subscriptions[0].identifier;
        /* The payload could either be an subscription or null (in case not found).
         * Therefore, we do not test the payload.
         */
        const expectedActionType = actionTypes.FETCH_SUBSCRIPTION_COMPLETE;
        const store = mockStore({});
        const asyncAction = actions.fetchSubscription(identifier);

        return store.dispatch(asyncAction).then(() => {
            const actualActions = store.getActions();
            expect(actualActions.length).toBe(1);
            expect(actualActions[0].type).toBe(expectedActionType);

            const history = mockBackend.history;
            expect(history.get.length).toBe(1);
            expect(history.get[0].url).toBe(
                "/api/v1/subscriptions/" + identifier
            );
        });
    });

    it("should create an action to notify completion of fetching subscriptions", () => {
        const subscriptions = [];
        const expectedAction = {
            type: actionTypes.FETCH_SUBSCRIPTIONS_COMPLETE,
            payload: [],
        };
        const actualAction = actions.fetchSubscriptionsComplete(subscriptions);
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to fetch subscriptions", () => {
        /* The order is important. Otherwise, the query string that reaches the mock backend may
         * appear in a different order than what we expect.
         */
        const params = {
            keys1: "value1",
            keys2: "value2",
        };

        /* The payload could either be an subscription or null (in case not found).
         * Therefore, we do not test the payload.
         */
        const expectedActionType = actionTypes.FETCH_SUBSCRIPTIONS_COMPLETE;
        const store = mockStore({});
        const asyncAction = actions.fetchSubscriptions(params);

        return store.dispatch(asyncAction).then(() => {
            const actualActions = store.getActions();
            expect(actualActions.length).toBe(1);
            expect(actualActions[0].type).toBe(expectedActionType);

            const history = mockBackend.history;
            expect(history.get.length).toBe(1);
            expect(history.get[0].url).toBe("/api/v1/subscriptions");
            expect(history.get[0].params).toEqual(params);
        });
    });

    it("should create an action to edit an subscription", () => {
        const subscription = {};
        const expectedAction = {
            type: actionTypes.EDIT_SUBSCRIPTION,
            payload: subscription,
        };
        const actualAction = actions.editSubscription(subscription);
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to clear an subscription from the store", () => {
        const expectedAction = {
            type: actionTypes.CLEAR_SUBSCRIPTION,
            payload: null,
        };
        const actualAction = actions.clearSubscription();
        expect(actualAction).toEqual(expectedAction);
    });
});

describe("invoice actions", () => {
    afterEach(() => {
        mockBackend.resetHistory();
    });

    it("should create an action to open new invoice dialog", () => {
        const expectedAction = {
            type: actionTypes.NEW_INVOICE,
            payload: null,
        };
        const actualAction = actions.newInvoice();
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to save an existing invoice", () => {
        const invoice = invoices[0];
        const expectedActions = [
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Saving invoice...",
                    category: "LOADING",
                },
            },
            {
                type: actionTypes.FETCH_INVOICE_COMPLETE,
                payload: invoice,
            },
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Successfully saved invoice",
                    category: "SUCCESS",
                },
            },
        ];
        const store = mockStore({});
        const asyncAction = actions.saveInvoice(invoice);

        return store.dispatch(asyncAction).then(() => {
            const history = mockBackend.history;
            const actualActions = store.getActions();

            expect(actualActions).toEqual(expectedActions);
            expect(history.put.length).toBe(1);
            expect(history.put[0].data).toBe(JSON.stringify(invoice));
            expect(history.put[0].url).toBe(
                "/api/v1/invoices/" + invoice.identifier
            );
        });
    });

    it("should create an action to notify invoice fetch completion", () => {
        const invoice = {};
        const expectedAction = {
            type: actionTypes.FETCH_INVOICE_COMPLETE,
            payload: invoice,
        };
        const actualAction = actions.fetchInvoiceComplete(invoice);
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to fetch an invoice", () => {
        const identifier = invoices[0].identifier;
        /* The payload could either be an invoice or null (in case not found).
         * Therefore, we do not test the payload.
         */
        const expectedActionType = actionTypes.FETCH_INVOICE_COMPLETE;
        const store = mockStore({});
        const asyncAction = actions.fetchInvoice(identifier);

        return store.dispatch(asyncAction).then(() => {
            const actualActions = store.getActions();
            expect(actualActions.length).toBe(1);
            expect(actualActions[0].type).toBe(expectedActionType);

            const history = mockBackend.history;
            expect(history.get.length).toBe(1);
            expect(history.get[0].url).toBe("/api/v1/invoices/" + identifier);
        });
    });

    it("should create an action to notify completion of fetching invoices", () => {
        const invoices = [];
        const expectedAction = {
            type: actionTypes.FETCH_INVOICES_COMPLETE,
            payload: [],
        };
        const actualAction = actions.fetchInvoicesComplete(invoices);
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to fetch invoices", () => {
        /* The order is important. Otherwise, the query string that reaches the mock backend may
         * appear in a different order than what we expect.
         */
        const params = {
            keys1: "value1",
            keys2: "value2",
        };

        /* The payload could either be an invoice or null (in case not found).
         * Therefore, we do not test the payload.
         */
        const expectedActionType = actionTypes.FETCH_INVOICES_COMPLETE;
        const store = mockStore({});
        const asyncAction = actions.fetchInvoices(params);

        return store.dispatch(asyncAction).then(() => {
            const actualActions = store.getActions();
            expect(actualActions.length).toBe(1);
            expect(actualActions[0].type).toBe(expectedActionType);

            const history = mockBackend.history;
            expect(history.get.length).toBe(1);
            expect(history.get[0].url).toBe("/api/v1/invoices");
            expect(history.get[0].params).toEqual(params);
        });
    });

    it("should create an action to edit an invoice", () => {
        const invoice = {};
        const expectedAction = {
            type: actionTypes.EDIT_INVOICE,
            payload: invoice,
        };
        const actualAction = actions.editInvoice(invoice);
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to clear an invoice from the store", () => {
        const expectedAction = {
            type: actionTypes.CLEAR_INVOICE,
            payload: null,
        };
        const actualAction = actions.clearInvoice();
        expect(actualAction).toEqual(expectedAction);
    });
});

describe("transaction actions", () => {
    afterEach(() => {
        mockBackend.resetHistory();
    });

    it("should create an action to open new transaction dialog", () => {
        const expectedAction = {
            type: actionTypes.NEW_TRANSACTION,
            payload: null,
        };
        const actualAction = actions.newTransaction();
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to create a new transaction", () => {
        const transaction = {};
        const expectedActions = [
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Saving transaction...",
                    category: "LOADING",
                },
            },
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Successfully created transaction",
                    category: "SUCCESS",
                },
            },
        ];
        const store = mockStore({});
        const asyncAction = actions.createTransaction(transaction);

        return store.dispatch(asyncAction).then(() => {
            const history = mockBackend.history;
            const actualActions = store.getActions();

            expect(actualActions).toEqual(expectedActions);
            expect(history.post.length).toBe(1);
            expect(history.post[0].data).toBe(JSON.stringify(transaction));
            expect(history.post[0].url).toBe("/api/v1/transactions");
        });
    });

    it("should create an action to save an existing transaction", () => {
        const transaction = transactions[0];
        const expectedActions = [
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Saving transaction...",
                    category: "LOADING",
                },
            },
            {
                type: actionTypes.FETCH_TRANSACTION_COMPLETE,
                payload: transaction,
            },
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Successfully saved transaction",
                    category: "SUCCESS",
                },
            },
        ];
        const store = mockStore({});
        const asyncAction = actions.saveTransaction(transaction);

        return store.dispatch(asyncAction).then(() => {
            const history = mockBackend.history;
            const actualActions = store.getActions();

            expect(actualActions).toEqual(expectedActions);
            expect(history.put.length).toBe(1);
            expect(history.put[0].data).toBe(JSON.stringify(transaction));
            expect(history.put[0].url).toBe(
                "/api/v1/transactions/" + transaction.identifier
            );
        });
    });

    it("should create an action to notify transaction fetch completion", () => {
        const transaction = {};
        const expectedAction = {
            type: actionTypes.FETCH_TRANSACTION_COMPLETE,
            payload: transaction,
        };
        const actualAction = actions.fetchTransactionComplete(transaction);
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to fetch a transaction", () => {
        const identifier = transactions[0].identifier;
        /* The payload could either be an transaction or null (in case not found).
         * Therefore, we do not test the payload.
         */
        const expectedActionType = actionTypes.FETCH_TRANSACTION_COMPLETE;
        const store = mockStore({});
        const asyncAction = actions.fetchTransaction(identifier);

        return store.dispatch(asyncAction).then(() => {
            const actualActions = store.getActions();
            expect(actualActions.length).toBe(1);
            expect(actualActions[0].type).toBe(expectedActionType);

            const history = mockBackend.history;
            expect(history.get.length).toBe(1);
            expect(history.get[0].url).toBe(
                "/api/v1/transactions/" + identifier
            );
        });
    });

    it("should create an action to notify completion of fetching transactions", () => {
        const transactions = [];
        const expectedAction = {
            type: actionTypes.FETCH_TRANSACTIONS_COMPLETE,
            payload: [],
        };
        const actualAction = actions.fetchTransactionsComplete(transactions);
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to fetch transactions", () => {
        /* The order is important. Otherwise, the query string that reaches the mock backend may
         * appear in a different order than what we expect.
         */
        const params = {
            keys1: "value1",
            keys2: "value2",
        };

        /* The payload could either be an transaction or null (in case not found).
         * Therefore, we do not test the payload.
         */
        const expectedActionType = actionTypes.FETCH_TRANSACTIONS_COMPLETE;
        const store = mockStore({});
        const asyncAction = actions.fetchTransactions(params);

        return store.dispatch(asyncAction).then(() => {
            const actualActions = store.getActions();
            expect(actualActions.length).toBe(1);
            expect(actualActions[0].type).toBe(expectedActionType);

            const history = mockBackend.history;
            expect(history.get.length).toBe(1);
            expect(history.get[0].url).toBe("/api/v1/transactions");
            expect(history.get[0].params).toEqual(params);
        });
    });

    it("should create an action to edit an transaction", () => {
        const transaction = {};
        const expectedAction = {
            type: actionTypes.EDIT_TRANSACTION,
            payload: transaction,
        };
        const actualAction = actions.editTransaction(transaction);
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to clear an transaction from the store", () => {
        const expectedAction = {
            type: actionTypes.CLEAR_TRANSACTION,
            payload: null,
        };
        const actualAction = actions.clearTransaction();
        expect(actualAction).toEqual(expectedAction);
    });
});

describe("plan actions", () => {
    afterEach(() => {
        mockBackend.resetHistory();
    });

    it("should create an action to open new plan dialog", () => {
        const expectedAction = {
            type: actionTypes.NEW_PLAN,
            payload: null,
        };
        const actualAction = actions.newPlan();
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to create a new plan", () => {
        const plan = {};
        const expectedActions = [
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Saving plan...",
                    category: "LOADING",
                },
            },
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Successfully created plan",
                    category: "SUCCESS",
                },
            },
        ];
        const store = mockStore({});
        const asyncAction = actions.createPlan(plan);

        return store.dispatch(asyncAction).then(() => {
            const history = mockBackend.history;
            const actualActions = store.getActions();

            expect(actualActions).toEqual(expectedActions);
            expect(history.post.length).toBe(1);
            expect(history.post[0].data).toBe(JSON.stringify(plan));
            expect(history.post[0].url).toBe("/api/v1/plans");
        });
    });

    it("should create an action to save an existing plan", () => {
        const plan = plans[0];
        const expectedActions = [
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Saving plan...",
                    category: "LOADING",
                },
            },
            {
                type: actionTypes.FETCH_PLAN_COMPLETE,
                payload: plan,
            },
            {
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    message: "Successfully saved plan",
                    category: "SUCCESS",
                },
            },
        ];
        const store = mockStore({});
        const asyncAction = actions.savePlan(plan);

        return store.dispatch(asyncAction).then(() => {
            const history = mockBackend.history;
            const actualActions = store.getActions();

            expect(actualActions).toEqual(expectedActions);
            expect(history.put.length).toBe(1);
            expect(history.put[0].data).toBe(JSON.stringify(plan));
            expect(history.put[0].url).toBe("/api/v1/plans/" + plan.identifier);
        });
    });

    it("should create an action to notify plan fetch completion", () => {
        const plan = {};
        const expectedAction = {
            type: actionTypes.FETCH_PLAN_COMPLETE,
            payload: plan,
        };
        const actualAction = actions.fetchPlanComplete(plan);
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to fetch an plan", () => {
        const identifier = plans[0].identifier;
        /* The payload could either be an plan or null (in case not found).
         * Therefore, we do not test the payload.
         */
        const expectedActionType = actionTypes.FETCH_PLAN_COMPLETE;
        const store = mockStore({});
        const asyncAction = actions.fetchPlan(identifier);

        return store.dispatch(asyncAction).then(() => {
            const actualActions = store.getActions();
            expect(actualActions.length).toBe(1);
            expect(actualActions[0].type).toBe(expectedActionType);

            const history = mockBackend.history;
            expect(history.get.length).toBe(1);
            expect(history.get[0].url).toBe("/api/v1/plans/" + identifier);
        });
    });

    it("should create an action to notify completion of fetching plans", () => {
        const plans = [];
        const expectedAction = {
            type: actionTypes.FETCH_PLANS_COMPLETE,
            payload: [],
        };
        const actualAction = actions.fetchPlansComplete(plans);
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to fetch plans", () => {
        /* The payload could either be an plan or null (in case not found).
         * Therefore, we do not test the payload.
         */
        const expectedActionType = actionTypes.FETCH_PLANS_COMPLETE;
        const store = mockStore({});
        const asyncAction = actions.fetchPlans();

        return store.dispatch(asyncAction).then(() => {
            const actualActions = store.getActions();
            expect(actualActions.length).toBe(1);
            expect(actualActions[0].type).toBe(expectedActionType);

            const history = mockBackend.history;
            expect(history.get.length).toBe(1);
            expect(history.get[0].url).toBe("/api/v1/plans");
        });
    });

    it("should create an action to edit an plan", () => {
        const plan = {};
        const expectedAction = {
            type: actionTypes.EDIT_PLAN,
            payload: plan,
        };
        const actualAction = actions.editPlan(plan);
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to clear an plan from the store", () => {
        const expectedAction = {
            type: actionTypes.CLEAR_PLAN,
            payload: null,
        };
        const actualAction = actions.clearPlan();
        expect(actualAction).toEqual(expectedAction);
    });
});

describe("miscellaneous actions", () => {
    it("should create an action to close dialog", () => {
        const expectedAction = {
            type: actionTypes.CLOSE_DIALOG,
            payload: null,
        };
        const actualAction = actions.closeDialog();
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to show notification", () => {
        const expectedAction = {
            type: actionTypes.SHOW_NOTIFICATION,
            payload: {
                message: "Hello, world!",
                category: "LOADING",
            },
        };
        const actualAction = actions.showNotification(
            "Hello, world!",
            "LOADING"
        );
        expect(actualAction).toEqual(expectedAction);
    });

    it("should create an action to close notification", () => {
        const expectedAction = {
            type: actionTypes.CLOSE_NOTIFICATION,
            payload: null,
        };
        const actualAction = actions.closeNotification();
        expect(actualAction).toEqual(expectedAction);
    });
});
