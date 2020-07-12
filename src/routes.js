import React from 'react';
import { Redirect } from 'react-router-dom';

import consoleConfiguration from './console/configuration';

function generateRoutes(configurations) {
    const routes = [];
    configurations.forEach(configuration => routes.push(...configuration.routes));
    return routes;
}

const routes = [
    ...generateRoutes(consoleConfiguration),
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
