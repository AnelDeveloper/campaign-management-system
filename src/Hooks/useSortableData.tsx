import { useState, useMemo } from 'react';

interface SortConfig {
    key: string;
    direction: 'ascending' | 'descending';
}

const useSortableData = <T extends Record<string, any>>(items: T[], initialConfig: SortConfig | null = null) => {
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(initialConfig);

    const sortedItems: T[] = useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (sortConfig.key === 'campaign_status_id') {
                    aValue = aValue === 1 ? 'Active' : 'Inactive';
                    bValue = bValue === 1 ? 'Active' : 'Inactive';
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key: string, direction: 'ascending' | 'descending') => {
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        } else {
            direction = 'ascending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

export default useSortableData;
