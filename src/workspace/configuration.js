import React from 'react';

const workspaceConfiguration = [
    {
        path : '/accounts/new',
        component : React.lazy(() => import('./account/NewAccount'))
    }
];

export default workspaceConfiguration;