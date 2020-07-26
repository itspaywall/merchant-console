## Steps to create New Dialog

1. Create `src/workspace/subscription/NewSubscription.js` with the `NewSubscription` component. See `NewAccount` for reference.
2. Next open `src/layouts/MainLayout.js`, where you will see how we are opening `NewAccount` dialog. Add another line that opens `NewSubscription` dialog similarly. Basically, when the user clicks "New Subscription" in Quick Add dialog, the `newSubscription()` action (defined in `src/actions.js`) will be invoked which dispatches the `NEW_SUBSCRIPTION` action. The `dialogReducer` (defined in `src/reducers.js`) updates the store by setting `store.openDialog` to `NEW_SUBSCRIPTION`. So, in `MainLayout.js`, you can write `{ (openDialog == 'NEW_SUBSCRIPTION) && <NewSubscription /> }`.
