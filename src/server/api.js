import axios from "axios";

const DEFAULT_API_VERSION = "v1";

export function newClient(version = DEFAULT_API_VERSION) {
    const prefix = `http://localhost:3001/api/${version}`;
    return {
        // Account

        newAccount: (account) => axios.post(`${prefix}/accounts`, account),

        saveAccount: (account) =>
            axios.put(`${prefix}/accounts/${account.id}`, account),

        getAccount: (id) => axios.get(`${prefix}/accounts/${id}`),

        getAccounts: (params) => axios.get(`${prefix}/accounts`, { params }),

        // Subscription
        newSubscription: (subscription) =>
            axios.post(`${prefix}/subscriptions`, subscription),

        saveSubscription: (subscription) =>
            axios.put(
                `${prefix}/subscriptions/${subscription.id}`,
                subscription
            ),

        getSubscription: (id) => axios.get(`${prefix}/subscriptions/${id}`),

        getSubscriptions: (params) =>
            axios.get(`${prefix}/subscriptions`, { params }),

        // Invoice
        saveInvoice: (invoice) =>
            axios.put(`${prefix}/invoices/${invoice.id}`, invoice),

        getInvoice: (id) => axios.get(`${prefix}/invoices/${id}`),

        getInvoices: (params) => axios.get(`${prefix}/invoices`, { params }),

        // Transaction
        newTransaction: (transaction) =>
            axios.post(`${prefix}/transactions`, transaction),

        saveTransaction: (transaction) =>
            axios.put(`${prefix}/transactions/${transaction.id}`, transaction),

        getTransaction: (id) => axios.get(`${prefix}/transactions/${id}`),

        getTransactions: (params) =>
            axios.get(`${prefix}/transactions`, { params }),

        // Plan

        newPlan: (plan) => axios.post(`${prefix}/plans`, plan),

        savePlan: (plan) => axios.put(`${prefix}/plans/${plan.id}`, plan),

        getPlan: (id) => axios.get(`${prefix}/plans/${id}`),

        getPlans: (params) => axios.get(`${prefix}/plans`, { params }),

        // Analytics
        getAnalytics: (params) => axios.get(`${prefix}/analytics`, { params }),
    };
}
