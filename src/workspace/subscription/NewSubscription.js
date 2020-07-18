import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/styles";
import RecordForm from "../RecordForm";
import * as actions from "../../redux/actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
	extraAction: {
		textTransform: "none",
	},
	dialogAction: {
		textTransform: "none",
	},
	mainMore: {
		marginLeft: "auto",
		marginRight: "auto",
		maxWidth: 800,
	},
	mainLess: {
		marginLeft: "auto",
		marginRight: "auto",
		maxWidth: 500,
	},
	actions: {
		width: "100%",
	},
	extraActions: {
		width: "50%",
		display: "flex",
	},
	dialogActions: {
		width: "50%",
		display: "flex",
		flexDirection: "row-reverse",
	},
}));

const groups = [
	{
		label: "Basic",
		children: [
			{
				label: "Customer / Organization Name",
				identifier: "userName",
				type: "text_field",
				required: false,
				readOnly: false,
				quickAdd: true,
				unique: false,
				hidden: false,
				tooltip:
					"The user name of the account that converts a plan to subscription",
				multipleValues: false,
				defaultValue: "",
			},
			{
				label: "Select Plan",
				identifier: "selectedPlan",
				type: "text_field",
				required: false,
				readOnly: false,
				quickAdd: true,
				unique: false,
				hidden: false,
				tooltip: "The plan associated with a subscription",
				multipleValues: true,
				defaultValue: "",
			},
			{
				label: "Subscription Period Start",
				identifier: "subscriptionStart",
				type: "calendar",
				required: false,
				readOnly: false,
				quickAdd: true,
				unique: false,
				hidden: false,
				tooltip: "Start Date of the subscription.",
				multipleValues: false,
				defaultValue: "",
			},
			{
				label: "Subscription Period End",
				identifier: "subscriptionEnd",
				type: "calendar",
				required: false,
				readOnly: false,
				quickAdd: true,
				unique: false,
				hidden: false,
				tooltip: "End Date of the subscription.",
				multipleValues: false,
				defaultValue: "",
			},
		],
	},
];

function extractValues(groups) {
	const result = [];
	groups.forEach((group) => {
		const values = group.children.map((field) => ({
			identifier: field.identifier,
			value: field.defaultValue,
		}));
		result.push(values);
	});
	return result;
}

function extractRecord(groups) {
	const result = {};
	groups.forEach((group) =>
		group.forEach((field) => (result[field.identifier] = field.value))
	);
	return result;
}

function NewSubscription(props) {
	const { closeDialog, createSubscription } = props;
	const classes = useStyles(props);
	const [showMore, setShowMore] = React.useState(false);
	const [values, setValues] = React.useState(extractValues(groups));
	const handleShowMore = () => {
		setShowMore(!showMore);
	};
	const handleSave = () => {
		closeDialog();
		createSubscription(extractRecord(values));
	};
	// TODO: Create a deep copy without serializing !
	const handleValueChange = (group, field, value) => {
		const newValues = JSON.parse(JSON.stringify(values));
		newValues[group][field].value = value;

		setValues(newValues);
	};

	return (
		<Dialog
			open={true}
			onClose={closeDialog}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">New Subscription</DialogTitle>
			<DialogContent>
				<RecordForm
					groups={groups}
					values={values}
					onValueChange={handleValueChange}
				/>
			</DialogContent>
			<DialogActions>
				<div className={classes.dialogActions}>
					<Button
						onClick={handleSave}
						color="primary"
						className={classes.dialogAction}
					>
						Save
					</Button>
					<Button
						onClick={closeDialog}
						color="primary"
						className={classes.dialogAction}
					>
						Cancel
					</Button>
				</div>
			</DialogActions>
		</Dialog>
	);
}

const mapDispatchToProps = {
	closeDialog: actions.closeDialog,
	createSubscription: actions.createSubscription,
};

export default connect(null, mapDispatchToProps)(NewSubscription);
