import axios from "axios";

const DEFAULT_API_VERSION = "v1";

function initializeAccount(account) {
    account.createdAt = new Date(account.createdAt);
    account.updatedAt = new Date(account.updatedAt);
    return account;
}

function initializeSubscription(subscription) {
    const {
        startsAt,
        activatedAt,
        cancelledAt,
        pausedAt,
        currentPeriodStart,
        currentPeriodEnd,
        createdAt,
        updatedAt,
    } = subscription;

    subscription.startsAt = new Date(startsAt);
    subscription.activatedAt = activatedAt ? new Date(activatedAt) : null;
    subscription.cancelledAt = cancelledAt ? new Date(cancelledAt) : null;
    subscription.pausedAt = pausedAt ? new Date(pausedAt) : null;
    subscription.currentPeriodStart = currentPeriodStart
        ? new Date(currentPeriodStart)
        : null;
    subscription.currentPeriodEnd = currentPeriodEnd
        ? new Date(currentPeriodEnd)
        : null;
    subscription.createdAt = new Date(createdAt);
    subscription.updatedAt = new Date(updatedAt);

    return subscription;
}

function initializeInvoice(invoice) {
    const { closedAt, dueAt, updatedAt, createdAt, items } = invoice;
    invoice.closedAt = closedAt ? new Date(closedAt) : null;
    invoice.dueAt = new Date(dueAt);
    invoice.updatedAt = new Date(updatedAt);
    invoice.createdAt = new Date(createdAt);

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.startedAt = new Date(item.startedAt);
        item.endedAt = new Date(item.endedAt);
    }

    return invoice;
}

function initializeTransaction(transaction) {
    transaction.createdAt = new Date(transaction.createdAt);
    transaction.updatedAt = new Date(transaction.updatedAt);

    return transaction;
}

function initializePlan(plan) {
    plan.createdAt = new Date(plan.createdAt);
    plan.updatedAt = new Date(plan.updatedAt);

    return plan;
}

export function newClient(version = DEFAULT_API_VERSION) {
    axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api/${version}`;

    return {
        // Account

        newAccount: async (account) => {
            const response = await axios.post(`/accounts`, account);
            return initializeAccount(response.data);
        },

        saveAccount: async (account) => {
            const response = await axios.put(
                `/accounts/${account.id}`,
                account
            );
            return initializeAccount(response.data);
        },

        getAccount: async (id) => {
            const response = await axios.get(`/accounts/${id}`);
            return initializeAccount(response.data);
        },

        getAccounts: async (params) => {
            const response = await axios.get(`/accounts`, { params });
            const accounts = response.data;
            const { records } = accounts;
            for (let i = 0; i < records.length; i++) {
                records[i] = initializeAccount(records[i]);
            }
            return accounts;
        },

        // Subscription
        newSubscription: async (subscription) => {
            const response = await axios.post(`/subscriptions`, subscription);
            return initializeSubscription(response.data);
        },

        saveSubscription: async (subscription) => {
            const response = await axios.put(
                `/subscriptions/${subscription.id}`,
                subscription
            );
            return initializeSubscription(response.data);
        },

        getSubscription: async (id) => {
            const response = await axios.get(`/subscriptions/${id}`);
            return initializeSubscription(response.data);
        },

        getSubscriptions: async (params) => {
            const response = await axios.get(`/subscriptions`, { params });
            const subscriptions = response.data;
            const { records } = subscriptions;
            for (let i = 0; i < records.length; i++) {
                records[i] = initializeSubscription(records[i]);
            }
            return subscriptions;
        },

        // Invoice
        saveInvoice: async (invoice) => {
            const response = await axios.put(
                `/invoices/${invoice.id}`,
                invoice
            );
            return initializeInvoice(response.data);
        },

        getInvoice: async (id) => {
            const response = await axios.get(`/invoices/${id}`);
            return initializeInvoice(response.data);
        },

        getInvoices: async (params) => {
            const response = await axios.get(`/invoices`, { params });
            const invoices = response.data;
            const { records } = invoices;
            for (let i = 0; i < records.length; i++) {
                records[i] = initializeInvoice(records[i]);
            }
            return invoices;
        },

        // Transaction
        newTransaction: async (transaction) => {
            const response = await axios.post(`/transactions`, transaction);
            return initializeTransaction(response.data);
        },

        saveTransaction: async (transaction) => {
            const response = await axios.put(
                `/transactions/${transaction.id}`,
                transaction
            );
            return initializeTransaction(response.data);
        },

        getTransaction: async (id) => {
            const response = await axios.get(`/transactions/${id}`);
            return initializeTransaction(response.data);
        },

        getTransactions: async (params) => {
            const response = await axios.get(`/transactions`, { params });
            const transactions = response.data;
            const { records } = transactions;
            for (let i = 0; i < records.length; i++) {
                records[i] = initializeTransaction(records[i]);
            }
            return transactions;
        },

        // Plan

        newPlan: async (plan) => {
            const response = await axios.post(`/plans`, plan);
            return initializePlan(response);
        },

        savePlan: async (plan) => {
            const response = await axios.put(`/plans/${plan.id}`, plan);
            return initializePlan(response);
        },

        getPlan: async (id) => {
            const response = await axios.get(`/plans/${id}`);
            return initializePlan(response.data);
        },

        getPlans: async (params) => {
            const response = await axios.get(`/plans`, { params });
            const plans = response.data;
            const { records } = plans;
            for (let i = 0; i < records.length; i++) {
                records[i] = initializePlan(records[i]);
            }
            return plans;
        },

        // Analytics
        getAnalytics: (params) => axios.get(`/analytics`, { params }),
    };
}
