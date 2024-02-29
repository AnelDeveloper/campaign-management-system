import './styles.modal.css'; 

const FilterForm: React.FC<{ handleFilterChange: (filterName: string, value: string | number) => void }> = ({ handleFilterChange }) => {
      return (

      <form className="filter-form"> 
        <input
          className="filter-input" 
          type="text"
          placeholder="Campaign Name"
          onChange={e => handleFilterChange('campaign_name', e.target.value)}
        />
        <select
          className="filter-select" 
          onChange={e => handleFilterChange('campaign_type', e.target.value)}
        >
          <option value="">Select Campaign Type</option>
          <option value="1">Standard</option>
          <option value="2">AB-Test</option>
          <option value="3">MV-Test</option>
        </select>
        <input
          className="filter-input" 
          type="date"
          onChange={e => handleFilterChange('campaign_start_time', e.target.value)}
        />
        <input
          className="filter-input" 
          type="date"
          onChange={e => handleFilterChange('campaign_end_time', e.target.value)}
        />
        <select
          className="filter-select" 
          onChange={e => handleFilterChange('campaign_status_id', e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="1">Active</option>
          <option value="0">Deleted</option>
        </select>
      </form>

    );
};

export default FilterForm;
