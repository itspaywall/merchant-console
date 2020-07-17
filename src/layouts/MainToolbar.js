import React from "react";
import {
<<<<<<< HEAD
	AppBar,
	Button,
	Toolbar,
	makeStyles,
	IconButton,
=======
    AppBar,
    Button,
    Toolbar,
    makeStyles,
    IconButton,
>>>>>>> 7771f42... Integrated Prettier format the source files on each commit.
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import AddDialog from "./AddDialog";

import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
<<<<<<< HEAD
	logoButton: {
		height: 64,
		width: 180,
		borderRadius: 0,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		color: theme.palette.primary,
		background: "white",
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	toolbar: {},
	hide: {
		display: "none",
	},
	buttons: {
		marginLeft: "auto",
	},
	addButton: {
		height: 64,
		width: 160,
	},
=======
    logoButton: {
        height: 64,
        width: 180,
        borderRadius: 0,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        color: theme.palette.primary,
        background: "white",
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {},
    hide: {
        display: "none",
    },
    buttons: {
        marginLeft: "auto",
    },
    addButton: {
        height: 64,
        width: 160,
    },
>>>>>>> 7771f42... Integrated Prettier format the source files on each commit.
}));

function MainToolbar(props) {
	const { toggleDrawer, drawerOpen } = props;
	const classes = useStyles();

<<<<<<< HEAD
	const [addDialogAnchor, setAddDialogAnchor] = React.useState(null);

	const handleOpenAddDialog = (event) =>
		setAddDialogAnchor(event.currentTarget);
	const handleCloseAddDialog = () => setAddDialogAnchor(null);

	return (
		<AppBar
			position="fixed"
			className={clsx(classes.appBar, {
				[classes.appBarShift]: drawerOpen,
			})}
		>
			<Toolbar className={classes.toolbar}>
				<IconButton
					onClick={toggleDrawer}
					edge="start"
					className={{ [classes.hide]: drawerOpen }}
				>
					<MenuIcon />
				</IconButton>

				<Button className={classes.logoButton}>
					<img
						src="assets/images/hubble.png"
						alt="Hubble logo"
						height="40px"
					/>
				</Button>
				<div className={classes.buttons}>
					<Button
						className={classes.addButton}
						variant="text"
						size="small"
						color="primary"
						onClick={handleOpenAddDialog}
					>
						<AddIcon />
						Quick Add
					</Button>
				</div>

				<AddDialog
					open={Boolean(addDialogAnchor)}
					onClose={handleCloseAddDialog}
					anchor={addDialogAnchor}
				/>
			</Toolbar>
		</AppBar>
	);
=======
    const [addDialogAnchor, setAddDialogAnchor] = React.useState(null);

    const handleOpenAddDialog = (event) =>
        setAddDialogAnchor(event.currentTarget);
    const handleCloseAddDialog = () => setAddDialogAnchor(null);

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: drawerOpen,
            })}
        >
            <Toolbar className={classes.toolbar}>
                <IconButton
                    onClick={toggleDrawer}
                    edge="start"
                    className={{ [classes.hide]: drawerOpen }}
                >
                    <MenuIcon />
                </IconButton>

                <Button className={classes.logoButton}>
                    <img
                        src="assets/images/hubble.png"
                        alt="Hubble logo"
                        height="40px"
                    />
                </Button>
                <div className={classes.buttons}>
                    <Button
                        className={classes.addButton}
                        variant="text"
                        size="small"
                        color="primary"
                        onClick={handleOpenAddDialog}
                    >
                        <AddIcon />
                        Quick Add
                    </Button>
                </div>

                <AddDialog
                    open={Boolean(addDialogAnchor)}
                    onClose={handleCloseAddDialog}
                    anchor={addDialogAnchor}
                />
            </Toolbar>
        </AppBar>
    );
>>>>>>> 7771f42... Integrated Prettier format the source files on each commit.
}

export default withRouter(MainToolbar);
