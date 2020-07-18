import React from "react";

const workspaceConfiguration = [
    // Account
    {
        path: "/accounts/new",
        component: React.lazy(() => import("./account/NewAccount")),
    },
    {
        path: "/accounts/id", // TODO: id should be variable
        component: React.lazy(() => import("./account/ViewAccount")),
    },
    {
        path: "/accounts",
        component: React.lazy(() => import("./account/ViewAccounts")),
    },

    // Invoice
    {
        path: "/invoices",
        component: React.lazy(() => import("./invoice/ViewInvoices")),
    },

    // Subscription
    {
        path: "/subscriptions",
        component: React.lazy(() => import("./subscription/ViewSubscriptions")),
    },

    // Transaction
    {
        path: "/transactions",
        component: React.lazy(() => import("./transaction/ViewTransactions")),
    },
];

export default workspaceConfiguration;
