import { combineReducers } from "redux";
import * as ActionTypes from "./actionTypes";

function dialogReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.NEW_ACCOUNT:
        case ActionTypes.NEW_SUBSCRIPTION:
        case ActionTypes.NEW_INVOICE:
        case ActionTypes.NEW_PLAN: {
            return action.type;
        }

        case ActionTypes.CLOSE_DIALOG: {
            return null;
        }

        default: {
            return state;
        }
    }
}

function notificationReducer(state = null, action) {
<<<<<<< HEAD:src/redux/reducers.js
	if (action.type === "SHOW_NOTIFICATION") {
		return {
			message: action.payload.message,
			category: action.payload.category,
		};
	} else if (action.type === "CLOSE_NOTIFICATION") {
		return null;
	}
	return state;
=======
    if (action.type === "SHOW_NOTIFICATION") {
        return {
            message: action.payload.message,
            category: action.payload.category,
        };
    } else if (action.type === "CLOSE_NOTIFICATION") {
        return null;
    }
    return state;
>>>>>>> 7771f42... Integrated Prettier format the source files on each commit.:src/reducers.js
}

function accountsReducer(state = [], action) {
    switch (action.type) {
        case ActionTypes.FETCH_ACCOUNTS_COMPLETE: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
}

const rootReducer = combineReducers({
    openDialog: dialogReducer,
    notification: notificationReducer,
    accounts: accountsReducer,
});

export default rootReducer;
