import React from 'react';
import { Redirect } from 'react-router-dom';

import workspaceConfiguration from './workspace/configuration';
import errorConfiguration from './error/configuration';

const routes = [
    ...workspaceConfiguration,
    ...errorConfiguration,
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
