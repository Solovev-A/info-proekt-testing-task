import { MapPoint } from "../types";

export const parseStoresData = (csv: string, maxLines: number = undefined): MapPoint[] => {
    return parseCsv(csv, maxLines)
        .map(rawStoreData => {
            const latitude = +rawStoreData[3];
            const longitude = +rawStoreData[4];
            const address = rawStoreData[0];
            const town = rawStoreData[1];

            return {
                position: [latitude, longitude],
                text: address,
                town
            }
        })
}

function parseCsv(csv: string, maxLines: number = undefined): string[][] {
    const lines = csv.split('\n')
        .slice(1, maxLines);

    return lines
        .filter(line => line.length > 0)
        .map(line => line.split(';'));
}