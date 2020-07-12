import React from 'react';

const consoleConfiguration = [
    {
        routes : [
            {
                path : '/accounts/new',
                component : React.lazy(() => import('./account/NewAccount'))
            }
        ]
    }
];

export default consoleConfiguration;