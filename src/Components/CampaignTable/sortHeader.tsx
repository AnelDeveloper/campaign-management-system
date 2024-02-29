import React from 'react';

interface SortHeaderProps {
    title: string;
    onSort: (field: string, direction: 'ascending' | 'descending') => void;
    sortConfig?: {
        key: string;
        direction: string;
    } | null; 
    field: string;
}

const SortHeader: React.FC<SortHeaderProps> = ({ title, onSort, sortConfig, field }) => {
    const handleSort = () => {
        const direction = sortConfig && sortConfig.key === field && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        onSort(field, direction);
    };

    const getClassNamesFor = (name: string) => {
        if (!sortConfig) return;
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <th onClick={handleSort} className={getClassNamesFor(field)}>
            {title}
        </th>
    );
};

export default SortHeader;
