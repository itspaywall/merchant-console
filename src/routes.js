import React from "react";
import { Redirect } from "react-router-dom";

import workspaceConfiguration from "./workspace/configuration";
import errorConfiguration from "./error/configuration";
import dashboardConfiguration from "./dashboard/configuration";
import configurationConfiguration from "./configuration/configuration";

const routes = [
<<<<<<< HEAD
	...workspaceConfiguration,
	...dashboardConfiguration,
	...errorConfiguration,
	...configurationConfiguration,
	{
		path: "/",
		exact: true,
		component: () => <Redirect to="/analytics" />,
	},
	{
		component: () => <Redirect to="/error/404" />,
	},
=======
    ...workspaceConfiguration,
    ...dashboardConfiguration,
    ...errorConfiguration,
    ...configurationConfiguration,
    {
        path: "/",
        exact: true,
        component: () => <Redirect to="/analytics" />,
    },
    {
        component: () => <Redirect to="/error/404" />,
    },
>>>>>>> 7771f42... Integrated Prettier format the source files on each commit.
];

export default routes;
