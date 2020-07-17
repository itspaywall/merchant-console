import React from "react";

const workspaceConfiguration = [
	// Account

<<<<<<< HEAD
	{
		path: "/accounts",
		component: React.lazy(() => import("./account/ViewAccounts")),
	},
	{
		path: "/accounts/new",
		component: React.lazy(() => import("./account/NewAccount")),
	},
=======
    {
        path: "/accounts",
        component: React.lazy(() => import("./account/ViewAccounts")),
    },
    {
        path: "/accounts/new",
        component: React.lazy(() => import("./account/NewAccount")),
    },
>>>>>>> 7771f42... Integrated Prettier format the source files on each commit.

	// Invoice

<<<<<<< HEAD
	{
		path: "/invoices",
		component: React.lazy(() => import("./invoice/ViewInvoices")),
	},
=======
    {
        path: "/invoices",
        component: React.lazy(() => import("./invoice/ViewInvoices")),
    },
>>>>>>> 7771f42... Integrated Prettier format the source files on each commit.

	// Subscription

<<<<<<< HEAD
	{
		path: "/subscriptions",
		component: React.lazy(() => import("./subscription/ViewSubscriptions")),
	},
=======
    {
        path: "/subscriptions",
        component: React.lazy(() => import("./subscription/ViewSubscriptions")),
    },
>>>>>>> 7771f42... Integrated Prettier format the source files on each commit.

	// Transaction

<<<<<<< HEAD
	{
		path: "/transactions",
		component: React.lazy(() => import("./transaction/ViewTransactions")),
	},
=======
    {
        path: "/transactions",
        component: React.lazy(() => import("./transaction/ViewTransactions")),
    },
>>>>>>> 7771f42... Integrated Prettier format the source files on each commit.
];

export default workspaceConfiguration;
