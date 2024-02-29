import React, { useState, useEffect } from 'react';
import CampaignModal from '../CampaignModal/campaignModal';
import useSortableData from '../../Hooks/useSortableData';
import CampaignRow from './campaignRow';
import SortHeader from './sortHeader';
import LoadingIndicator from '../LoadingIndicator/loadingIndicator';
import FilterForm from '../FilterForm/filterForm';
import './styles.modal.css';

import translations from '../../Config/en.json';
import Pagination from '../Pagination/campaignPagination';

interface Campaign {
    id: string;
    campaign_name: string;
    campaign_type: string;
    campaign_start_time: string;
    campaign_end_time: string;
    campaign_status_id: string;
}

interface CampaignTableProps {
    campaigns: Campaign[];
}

interface Filters {
    campaign_name: string;
    campaign_type: string;
    campaign_start_time: string;
    campaign_end_time: string;
    campaign_status_id: string;
}



const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const initialFiltersState: Filters = {
        campaign_name: '',
        campaign_type: '',
        campaign_start_time: '',
        campaign_end_time: '',
        campaign_status_id: '',
    };
    
    const [filters, setFilters] = useState<Filters>(initialFiltersState);


    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const toggleModal = (campaign: Campaign | null) => {
        setSelectedCampaign(campaign);
        setModalOpen(!modalOpen);
    };

    const handleEdit = (campaign: Campaign) => {
        toggleModal(campaign);
    };

    const handleFilterChange = (filterName: string, value: string) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
    };

    const applyFilters = (campaigns: Campaign[], filters: Campaign) => {
        return campaigns.filter(campaign => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                if (key.includes('time')) {
                    return campaign[key] === value;
                }
                return campaign[key].toString().toLowerCase().includes(value.toLowerCase());
            });
        });
    };

    const { items: sortedCampaigns, requestSort, sortConfig } = useSortableData<Campaign>(applyFilters(campaigns, filters));

    const currentItems = sortedCampaigns.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedCampaigns.length / itemsPerPage);

    return (
        <div className='campaign-table'>
            <div className="campaignHeader">
                <h2 className='campaignHeaderh2'>{translations.CampaignList}</h2>
                <div className="tooltipContainer">
                    <button onClick={() => toggleModal(null)} className="addCampaignButton">
                        <span className="customTooltip">{translations.InfoAddCampaign}</span>
                        {translations.AddCampaign}
                    </button>
                </div>
            </div>
            <FilterForm handleFilterChange={handleFilterChange} />
            {loading ? (
                <div className="loading-container">
                    <LoadingIndicator />
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <SortHeader title="Name" field="campaign_name" onSort={requestSort} sortConfig={sortConfig} />
                            <th>{translations.Type}</th>
                            <SortHeader title="Start Date" field="campaign_start_time" onSort={requestSort} sortConfig={sortConfig} />
                            <SortHeader title="End Date" field="campaign_end_time" onSort={requestSort} sortConfig={sortConfig} />
                            <SortHeader title="Status" field="campaign_status_id" onSort={requestSort} sortConfig={sortConfig} />
                            <th>{translations.Actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((campaign) => (
                            <CampaignRow
                                key={campaign.id}
                                campaign={campaign}
                                onEdit={() => handleEdit(campaign)}
                            />
                        ))}
                    </tbody>
                </table>
            )}
            {modalOpen && <CampaignModal onClose={() => toggleModal(null)} campaignToEdit={selectedCampaign} />}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                setItemsPerPage={setItemsPerPage} 
                itemsPerPage={0} />
        </div>
    );
};

export default CampaignTable;
