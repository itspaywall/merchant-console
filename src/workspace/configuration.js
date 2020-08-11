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
        path: "/invoices/:identifier",
        component: React.lazy(() => import("./invoice/ViewInvoice")),
    },
    {
        path: "/invoices",
        component: React.lazy(() => import("./invoice/ViewInvoices")),
        exact: true,
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
        path: "/transactions/:identifier",
        component: React.lazy(() => import("./transaction/ViewTransaction")),
    },
    {
        path: "/transactions",
        component: React.lazy(() => import("./transaction/ViewTransactions")),
        exact: true,
    },

    // Plan
    {
        path: "/plans/:identifier",
        component: React.lazy(() => import("./plan/ViewPlan")),
    },
    {
        path: "/plans",
        component: React.lazy(() => import("./plan/ViewPlans")),
        exact: true,
    },

    // Analytics
    {
        path: "/analytics",
        component: React.lazy(() => import("./analytics/Analytics")),
        exact: true,
    },
    
    // Preferences
    {
        path: "/preferences",
        component: React.lazy(() => import("./preferences/Preferences")),
        exact: true,
    },
];

export default workspaceConfiguration;
