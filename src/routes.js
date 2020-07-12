import React from 'react';
import { Redirect } from 'react-router-dom';

import consoleConfiguration from './console/configuration';
import errorConfiguration from './error/configuration';

function generateRoutes(configurations) {
    const routes = [];
    configurations.forEach(configuration => routes.push(...configuration.routes));
    return routes;
}

const unpackedRoutes = [
    ...consoleConfiguration,
    ...errorConfiguration
];

const routes = [
    ...generateRoutes(unpackedRoutes),
    {
        path : '/',
        exact : true,
        component : () => <Redirect to="/index" />
    },
    {
        component : () => <Redirect to="/error/404" />
    }
];

export default routes;
