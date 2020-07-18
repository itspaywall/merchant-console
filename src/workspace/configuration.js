import React from "react";

const workspaceConfiguration = [
    // Account
    {
        path: "/accounts/id", // TODO: id should be variable
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
