import { saveState } from './CampaignData/localStorage';
import throttle from 'lodash/throttle';

export const subscribeStore = (store) => {
  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));
};
