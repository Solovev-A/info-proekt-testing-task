import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { YandexMap } from './components/YandexMap';
import { Coordinates, MapPoint } from './types';
import { fetchStoresData } from './utils/fetchStoresData';
import { parseStoresData } from './utils/parseStoreData';
import { distinct } from './utils/distinct';

// Старый самописный компонент
import { Autocomplete } from 'react-dropdown-components';

import './app.css';

export const App = () => {
    const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
    const [filteredTowns, setFilteredTowns] = useState<string[]>([]);
    const [selectedTown, setSelectedTown] = useState<string>(null);
    const [selectedTownMapPoints, setSelectedMapPoints] = useState<MapPoint[]>([]);

    useEffect(() => {
        fetchStoresData()
            .then(parseStoresData)
            .then(setMapPoints);
    }, []);

    const towns: string[] = useMemo(() => {
        const allTowns = mapPoints
            .map(point => point.town);
        const sortedTowns = distinct(allTowns).sort();
        setFilteredTowns(sortedTowns);
        return sortedTowns;
    }, [mapPoints]);

    const centerPosition: Coordinates = useMemo(() => {
        return selectedTownMapPoints.length > 0
            ? selectedTownMapPoints[0].position
            : [55.75, 37.57];
    }, [selectedTownMapPoints]);

    const handleSelectedTownChange = useCallback((value) => {
        const points = mapPoints.filter(point => point.town === value);
        if (points.length > 0) {
            setSelectedMapPoints(points);
        }
        setSelectedTown(value);
        setFilteredTowns(towns);
    }, [towns]);

    const handleSearch = useCallback((searchQuery: string) => {
        const regexp = new RegExp(`${searchQuery}`, 'i');

        const filtered = towns
            .filter(town => regexp.test(town))
            .slice(0, 9);
        setFilteredTowns(filtered);
    }, [towns]);

    return (
        <div className='container'>
            <div className='select__container'>
                <label>Выберите город (отображаются первые 10 результатов поиска)</label>
                <Autocomplete
                    options={filteredTowns}
                    value={selectedTown}
                    onChange={handleSelectedTownChange}
                    onSearchChange={handleSearch}
                    threshold={-9}
                />
            </div>
            <YandexMap
                zoom={9}
                center={centerPosition}
                width={600}
                height={500}
                points={mapPoints}
            />
        </div>
    )
}
