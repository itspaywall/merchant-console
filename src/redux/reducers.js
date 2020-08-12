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

function analyticsReducer(
    state = {
        subscriptionSummary: {},
        revenueSummary: {},
        planSummary: {},
        subscriberData: [],
        churnRateData: [],
        revenueData: [],
        transactionData: [],
        planData: [],
        conversionData: [],
    },
    action
) {
    switch (action.type) {
        case ActionTypes.FETCH_ANALYTICS_COMPLETE: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
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

function subscriptionsReducer(state = [], action) {
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

function invoicesReducer(state = [], action) {
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

function transactionsReducer(state = [], action) {
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

function plansReducer(state = [], action) {
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
});

export default rootReducer;
