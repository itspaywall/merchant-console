/*
 * Copyright 2017-2020 Samuel Rowe, Joel E. Rego
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { PrimaryLayout } from "./common";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import theme from "./theme";
import * as actions from "./redux/actions";

const useStyles = makeStyles((theme) => ({
    checking: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
    },
    checkingProgress: {
        marginTop: 16,
    },
    checkingText: {
        marginTop: 16,
        fontSize: 16,
    },
}));

function App(props) {
    const { user, isUserLoading, fetchUser } = props;
    const classes = useStyles();

    const renderCheckingAuthorization = () => {
        if (isUserLoading) {
            return (
                <div className={classes.checking}>
                    <CircularProgress
                        size={50}
                        thickness={4}
                        className={classes.checkingProgress}
                        variant="indeterminate"
                    />
                    <Typography className={classes.checkingText}>
                        Checking authorization...
                    </Typography>
                </div>
            );
        }

        if (!isUserLoading && !user) {
            window.location = `${process.env.REACT_APP_WEBSITE_URL}/login`;
        }

        return null;
    };

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <React.Fragment>
            <CssBaseline />
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    {user && <PrimaryLayout />}
                    {renderCheckingAuthorization()}
                </ThemeProvider>
            </BrowserRouter>
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    return {
        user: state.user,
        isUserLoading: state.isUserLoading,
    };
}

const mapDispatchToProps = {
    fetchUser: actions.fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
