import React from "react";

const configurationConfiguration = [
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
];

export default configurationConfiguration;
