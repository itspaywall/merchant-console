import React from "react";

const dashboardConfiguration = [
    {
        path: "/analytics",
        component: React.lazy(() => import("./analytics/Analytics")),
    },
];

export default dashboardConfiguration;
