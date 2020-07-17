import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import layouts from "../layouts";

const styles = (theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    },
});

function PrimaryLayout(props) {
	const { classes } = props;

    // const Layout = layouts[settings.layout.name];
    const Layout = layouts["main"];
    return <Layout className={classes.root} {...props} />;
}

export default withStyles(styles)(withRouter(PrimaryLayout));
