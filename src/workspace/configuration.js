import React from "react";

const workspaceConfiguration = [
    // Account
    {
        path: "/accounts/:identifier",
        component: React.lazy(() => import("./account/ViewAccount")),
    },
    {
        path: "/accounts",
        component: React.lazy(() => import("./account/ViewAccounts")),
        exact: true,
    },

    // Invoice
    {
        path: "/invoices",
        component: React.lazy(() => import("./invoice/ViewInvoices")),
    },

    // Subscription
    {
        path: "/subscriptions/:identifier",
        component: React.lazy(() => import("./subscription/ViewSubscription")),
    },
    {
        path: "/subscriptions",
        component: React.lazy(() => import("./subscription/ViewSubscriptions")),
        exact: true,
    },

    // Transaction
    {
        path: "/transactions",
        component: React.lazy(() => import("./transaction/ViewTransactions")),
    },
];

export default workspaceConfiguration;
