import React from "react";

const errorConfiguration = [
<<<<<<< HEAD
	{
		path: "/error/404",
		component: React.lazy(() => import("./Error404")),
	},
	{
		path: "/error/500",
		component: React.lazy(() => import("./Error500")),
	},
=======
    {
        path: "/error/404",
        component: React.lazy(() => import("./Error404")),
    },
    {
        path: "/error/500",
        component: React.lazy(() => import("./Error500")),
    },
>>>>>>> 7771f42... Integrated Prettier format the source files on each commit.
];

export default errorConfiguration;
