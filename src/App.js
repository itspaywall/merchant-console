import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { PrimaryLayout } from './common';

function App() {
    return (
    	<React.Fragment>
	    	<CssBaseline />
	        <BrowserRouter>
	            <PrimaryLayout />
	        </BrowserRouter>
	    </React.Fragment>
    );
};

export default App;
