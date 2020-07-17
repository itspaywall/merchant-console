import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { PrimaryLayout } from "./common";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";

function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <PrimaryLayout />
                </ThemeProvider>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
