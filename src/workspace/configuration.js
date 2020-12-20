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

import React from "react";

const workspaceConfiguration = [
    // API Key
    {
        path: "/api-keys",
        component: React.lazy(() => import("./api-key/ViewAPIKeys")),
    },

    // Webhooks
    {
        path: "/webhooks",
        component: React.lazy(() => import("./webhook/ViewWebhooks")),
    },

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
