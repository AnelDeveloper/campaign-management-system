import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCampaign, editCampaign } from '../../Redux/CampaignData/reducer';
import { useCustomToast } from '../Notifications/notification';
import LoadingIndicator from '../LoadingIndicator/loadingIndicator';
import './styles.modal.css';
import UseForm from '../../Hooks/useForm';

interface Campaign {
    id: string;
    name: string;
    campaign_name: string;
    campaign_type: string;
    campaign_start_time: string;
    campaign_end_time: string;
    campaign_status_id: number | String;
}

interface CampaignModalProps {
    onClose: () => void;
    campaignToEdit: Campaign | null;
}

const CampaignModal: React.FC<CampaignModalProps> = ({ onClose, campaignToEdit }) => {
    const [campaign, setCampaign] = useState<Campaign>({
        id: '',
        name: '',
        campaign_name: '',
        campaign_type: '',
        campaign_start_time: '',
        campaign_end_time: '',
        campaign_status_id: 1,
    });
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const notify = useCustomToast();

    useEffect(() => {
        if (campaignToEdit) {
            setCampaign(campaignToEdit);
        }
    }, [campaignToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedValue = ['campaign_type', 'campaign_status_id'].includes(name) ? parseInt(value, 10) : value;
        setCampaign(prev => ({ ...prev, [name]: updatedValue }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

        const startDate = new Date(campaign.campaign_start_time);
        const endDate = new Date(campaign.campaign_end_time);

        if (startDate > endDate) {
            notify('The start date cannot be after the end date.');
            setIsLoading(false);
            return;
        }

        try {
            await delay(1000);
            if (campaignToEdit) {
                await dispatch(editCampaign({ id: campaignToEdit.id, data: campaign }));
                notify('Campaign updated successfully!');
            } else {
                await dispatch(addCampaign({ ...campaign, id: Date.now().toString() }));
                notify('Campaign added successfully!');
            }
        } catch (error) {
            console.error('Error:', error);
            notify('An error occurred.');
        } finally {
            setIsLoading(false);
            onClose();
        }
    };

    const formFields = [
        { type: 'text', name: 'campaign_name', placeholder: 'Campaign Name', value: campaign.campaign_name, required: true },
        {
            type: 'select', name: 'campaign_type', value: campaign.campaign_type.toString(), required: true, options: [
                { value: '', label: 'Select Campaign Type' }, { value: '1', label: 'Standard' },
                { value: '2', label: 'AB-Test' }, { value: '3', label: 'MV-Test' }
            ]
        },
        { type: 'date', name: 'campaign_start_time', placeholder: '', value: campaign.campaign_start_time, required: true },
        { type: 'date', name: 'campaign_end_time', placeholder: '', value: campaign.campaign_end_time, required: true },
        {
            type: 'select', name: 'campaign_status_id', value: campaign.campaign_status_id.toString(), required: true, options: [
                { value: '1', label: 'Active' },
                { value: '0', label: 'Deleted' }
            ]
        },
    ];

    return (
        <div className="modalOverlay">
            <div className="modalContainer">
                {isLoading && <LoadingIndicator />}
                <h2>{campaignToEdit ? 'Edit Campaign' : 'Add New Campaign'}</h2>
                <UseForm fields={formFields} handleChange={handleChange} handleSubmit={handleSubmit} onClose={onClose} />
            </div>
        </div>
    );
};

export default CampaignModal;
