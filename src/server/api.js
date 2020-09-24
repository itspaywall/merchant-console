import axios from "axios";

const DEFAULT_API_VERSION = "v1";

export function newClient(version = DEFAULT_API_VERSION) {
    axios.defaults.baseURL = `{process.env.REACT_APP_SERVER_URL}/api/${version}`;

    return {
        // Account

        newAccount: (account) => axios.post(`/accounts`, account),

        saveAccount: (account) => axios.put(`/accounts/${account.id}`, account),

        getAccount: (id) => axios.get(`/accounts/${id}`),

        getAccounts: (params) => axios.get(`/accounts`, { params }),

        // Subscription
        newSubscription: (subscription) =>
            axios.post(`/subscriptions`, subscription),

        saveSubscription: (subscription) =>
            axios.put(`/subscriptions/${subscription.id}`, subscription),

        getSubscription: (id) => axios.get(`/subscriptions/${id}`),

        getSubscriptions: (params) => axios.get(`/subscriptions`, { params }),

        // Invoice
        saveInvoice: (invoice) => axios.put(`/invoices/${invoice.id}`, invoice),

        getInvoice: (id) => axios.get(`/invoices/${id}`),

        getInvoices: (params) => axios.get(`/invoices`, { params }),

        // Transaction
        newTransaction: (transaction) =>
            axios.post(`/transactions`, transaction),

        saveTransaction: (transaction) =>
            axios.put(`/transactions/${transaction.id}`, transaction),

        getTransaction: (id) => axios.get(`/transactions/${id}`),

        getTransactions: (params) => axios.get(`/transactions`, { params }),

        // Plan

        newPlan: (plan) => axios.post(`/plans`, plan),

        savePlan: (plan) => axios.put(`/plans/${plan.id}`, plan),

        getPlan: (id) => axios.get(`/plans/${id}`),

        getPlans: (params) => axios.get(`/plans`, { params }),

        // Analytics
        getAnalytics: (params) => axios.get(`/analytics`, { params }),
    };
}
