import React from "react";
import { Redirect } from "react-router-dom";

import workspaceConfiguration from "./workspace/configuration";
import errorConfiguration from "./error/configuration";
import dashboardConfiguration from "./dashboard/configuration";
import configurationConfiguration from "./configuration/configuration";

const routes = [
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
];

export default routes;
