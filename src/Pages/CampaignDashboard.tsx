import { useSelector } from 'react-redux';
import CampaignTable from '../Components/CampaignTable/campaignTable';
import { RootState } from '../Redux/store'; 

const CampaignDashboard = () => {
    const campaigns = useSelector((state: RootState) => state.campaigns.campaigns);

    return (
        <div>
            <CampaignTable campaigns={campaigns} />
        </div>
    );
};

export default CampaignDashboard;
