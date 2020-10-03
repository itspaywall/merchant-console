import { combineReducers } from "redux";
import * as ActionTypes from "./actionTypes";

function dialogReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.NEW_ACCOUNT:
        case ActionTypes.NEW_SUBSCRIPTION:
        case ActionTypes.NEW_INVOICE:
        case ActionTypes.NEW_TRANSACTION:
        case ActionTypes.NEW_PLAN:
        case ActionTypes.EDIT_ACCOUNT:
        case ActionTypes.EDIT_TRANSACTION:
        case ActionTypes.EDIT_PLAN:
        case ActionTypes.EDIT_INVOICE: {
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
    if (action.type === "SHOW_NOTIFICATION") {
        return {
            message: action.payload.message,
            category: action.payload.category,
        };
    } else if (action.type === "CLOSE_NOTIFICATION") {
        return null;
    }
    return state;
}

function analyticsReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.FETCH_ANALYTICS_COMPLETE: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
}

function accountsReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.FETCH_ACCOUNTS_COMPLETE: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
}

function accountReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.FETCH_ACCOUNT_COMPLETE:
        case ActionTypes.EDIT_ACCOUNT: {
            return action.payload;
        }

        case ActionTypes.CLEAR_ACCOUNT: {
            return null;
        }

        default: {
            return state;
        }
    }
}

function subscriptionsReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.FETCH_SUBSCRIPTIONS_COMPLETE: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
}

function subscriptionReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.FETCH_SUBSCRIPTION_COMPLETE: {
            return action.payload;
        }

        case ActionTypes.CLEAR_SUBSCRIPTION: {
            return null;
        }

        default: {
            return state;
        }
    }
}

function invoicesReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.FETCH_INVOICES_COMPLETE: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
}

function invoiceReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.FETCH_INVOICE_COMPLETE:
        case ActionTypes.EDIT_INVOICE: {
            return action.payload;
        }

        case ActionTypes.CLEAR_INVOICE: {
            return null;
        }

        default: {
            return state;
        }
    }
}

function transactionsReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.FETCH_TRANSACTIONS_COMPLETE: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
}

function transactionReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.FETCH_TRANSACTION_COMPLETE:
        case ActionTypes.EDIT_TRANSACTION: {
            return action.payload;
        }

        case ActionTypes.CLEAR_TRANSACTION: {
            return null;
        }

        default: {
            return state;
        }
    }
}

function plansReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.FETCH_PLANS_COMPLETE: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
}

function planReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.FETCH_PLAN_COMPLETE:
        case ActionTypes.EDIT_PLAN: {
            return action.payload;
        }

        case ActionTypes.CLEAR_ACCOUNT: {
            return null;
        }

        default: {
            return state;
        }
    }
}

function userReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.FETCH_USER_COMPLETE: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
}

function isUserLoadingReducer(state = true, action) {
    switch (action.type) {
        case ActionTypes.FETCH_USER_COMPLETE:
        case ActionTypes.FETCH_USER_FAILED: {
            return false;
        }

        default: {
            return state;
        }
    }
}

function internalRedirectReducer(state = null, action) {
    switch (action.type) {
        case ActionTypes.INTERNAL_REDIRECT: {
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
    analytics: analyticsReducer,
    accounts: accountsReducer,
    account: accountReducer,
    subscriptions: subscriptionsReducer,
    subscription: subscriptionReducer,
    transactions: transactionsReducer,
    transaction: transactionReducer,
    plans: plansReducer,
    plan: planReducer,
    invoices: invoicesReducer,
    invoice: invoiceReducer,
    user: userReducer,
    isUserLoading: isUserLoadingReducer,
    internalRedirect: internalRedirectReducer,
});

export default rootReducer;
