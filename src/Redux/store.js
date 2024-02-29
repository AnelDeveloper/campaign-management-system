
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import campaignReducer from './CampaignData/reducer';
import { loadState } from './CampaignData/localStorage';
import { subscribeStore } from './subscribeStore';

const persistedState = loadState();

const reducer = combineReducers({
  campaigns: campaignReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
  preloadedState: persistedState,
});

subscribeStore(store);

export default store;
