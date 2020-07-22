import React from "react";

const configurationConfiguration = [
    // Preferences
    {
        path: "/preferences",
        component: React.lazy(() => import("./preferences/Preferences")),
    },
];

export default configurationConfiguration;
