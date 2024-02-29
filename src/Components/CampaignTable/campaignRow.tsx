import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCampaignStatus } from '../../Redux/CampaignData/reducer';
import translations from '../../Config/en.json';

interface Campaign {
  id: string;
  campaign_name: string;
  campaign_type: number; 
  campaign_start_time: string;
  campaign_end_time: string;
  campaign_status_id: number; 
}

interface CampaignRowProps {
  campaign: Campaign;
  onEdit: () => void; 
}

const CampaignRow: React.FC<CampaignRowProps> = ({ campaign, onEdit }) => {
    const dispatch = useDispatch();

    const handleToggleStatus = () => {
        dispatch(toggleCampaignStatus(campaign.id));
    };

    return (
        <tr>
            <td>{campaign.campaign_name}</td>
            <td>{campaign.campaign_type === 1 ? 'Standard' : campaign.campaign_type === 2 ? 'AB-Test' : 'MV-Test'}</td>
            <td>{campaign.campaign_start_time}</td>
            <td>{campaign.campaign_end_time}</td>
            <td>
                <span className={`status ${campaign.campaign_status_id === 1 ? 'statusActive' : 'statusInactive'}`}>
                    <i className={`statusIcon ${campaign.campaign_status_id === 1 ? 'fa fa-check' : 'fa fa-times'}`} aria-hidden="true"></i>
                    {campaign.campaign_status_id === 1 ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td>
                <div className="tooltipContainer">
                    <button className='editButton' onClick={onEdit}>
                        {translations.Edit}
                        <span className="customTooltip">{translations.InfoEdit}</span>
                    </button>
                </div>
                <div className="tooltipContainer">
                    <button className="statusButton" onClick={handleToggleStatus}>
                        {translations.ToggleStatus}
                        <span className="customTooltip">{translations.InfoStatus}</span>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default CampaignRow;
