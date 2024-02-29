

export const addCampaignReducer = (state, action) => {
  state.campaigns.push(action.payload);
};

export const editCampaignReducer = (state, action) => {
  const { id, data } = action.payload;
  const index = state.campaigns.findIndex(campaign => campaign.id === id);
  if (index !== -1) {
    state.campaigns[index] = { ...state.campaigns[index], ...data };
  }
};

export const deleteCampaignReducer = (state, action) => {
  state.campaigns = state.campaigns.filter(campaign => campaign.id !== action.payload);
};

export const toggleCampaignStatusReducer = (state, action) => {
  const campaign = state.campaigns.find(campaign => campaign.id === action.payload);
  if (campaign) {
    campaign.campaign_status_id = campaign.campaign_status_id === 1 ? 0 : 1;
  }
};

export const loadCampaignsReducer = (state, action) => {
  state.campaigns = action.payload;
};

export const setLoadingReducer = (state) => {
    state.isLoading = true;
  }

export const clearLoadingReducer = (state) => {
    state.isLoading = false;
  }
