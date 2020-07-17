import React from "react";

const errorConfiguration = [
    {
        path: "/error/404",
        component: React.lazy(() => import("./Error404")),
    },
    {
        path: "/error/500",
        component: React.lazy(() => import("./Error500")),
    },
];

export default errorConfiguration;
