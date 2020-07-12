import { combineReducers } from 'redux';
import * as ActionTypes from './actionTypes';

function openDialogReducer(state = null, action) {
	let result = state;
	switch (action.type) {
		case ActionTypes.NEW_ACCOUNT:
		case ActionTypes.NEW_SUBSCRIPTION:
		case ActionTypes.NEW_INVOICE:
		case ActionTypes.NEW_PLAN: {
			result = action.type;
			break;
		}
	}
	return result;
}

const rootReducer = combineReducers({
	openDialog: openDialogReducer
});

export default rootReducer;