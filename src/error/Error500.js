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

import React from "react";
import { withStyles, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = (theme) => ({
    root: {},
    image: {
        marginTop: 120,
        width: 600,
        height: "auto",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
    },
    title: {
        marginTop: 16,
        textAlign: "center",
    },
    description: {
        marginTop: 16,
        textAlign: "center",
    },
    link: {
        marginTop: 16,
        textAlign: "center",
        display: "block",
    },
});

function Error404(props) {
    const { classes } = props;
    return (
        <Grid container={true} justify="center" className={classes.root}>
            <Grid item={true} lg={6}>
                <img
                    className={classes.image}
                    src="assets/images/500.png"
                    alt="Error 500"
                />
                <Typography
                    variant="h4"
                    color="textSecondary"
                    className={classes.title}
                >
                    Well, you broke the Internet!
                </Typography>

                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.description}
                >
                    Just kidding! Looks like we have an internal issue, please
                    try again in a couple of minutes.
                </Typography>

                <Link className={classes.link} to="/analytics">
                    Go back to analytics
                </Link>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(Error404);
