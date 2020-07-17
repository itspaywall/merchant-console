import React from "react";

const configurationConfiguration = [
<<<<<<< HEAD
	// Plans
	{
		path: "/plans",
		component: React.lazy(() => import("./plan/ViewPlans")),
	},

	// Preferences
	{
		path: "/preferences",
		component: React.lazy(() => import("./preferences/Preferences")),
	},
=======
    // Plans
    {
        path: "/plans",
        component: React.lazy(() => import("./plan/ViewPlans")),
    },

    // Preferences
    {
        path: "/preferences",
        component: React.lazy(() => import("./preferences/Preferences")),
    },
>>>>>>> 7771f42... Integrated Prettier format the source files on each commit.
];

export default configurationConfiguration;
