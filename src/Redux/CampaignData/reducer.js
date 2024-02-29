import { createSlice } from '@reduxjs/toolkit';

import { 
    addCampaignReducer,
    editCampaignReducer,
    deleteCampaignReducer,
    toggleCampaignStatusReducer,
    loadCampaignsReducer,
    setLoadingReducer,
    clearLoadingReducer } from './campaignReducers';

const initialState = {
    campaigns: [],
    isLoading: false,
};

const campaignSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    addCampaign: addCampaignReducer,
    editCampaign: editCampaignReducer,
    deleteCampaign: deleteCampaignReducer,
    toggleCampaignStatus: toggleCampaignStatusReducer,
    loadCampaigns: loadCampaignsReducer,
    setLoading: setLoadingReducer,
    clearLoading: clearLoadingReducer
  },
});

export const { addCampaign, editCampaign, deleteCampaign, toggleCampaignStatus, loadCampaigns, setLoading, clearLoading} = campaignSlice.actions;
export default campaignSlice.reducer;