import { MapPoint } from "../types";

export const parseStoresData = (csv: string): MapPoint[] => {
    const lines = csv.split('\n');

    return lines
        .filter((line, index) => index !== 0 && line.length > 0)
        .map(line => {
            const storeDataRaw = line.split(';');

            const latitude = +storeDataRaw[3];
            const longitude = +storeDataRaw[4];
            const address = storeDataRaw[0];
            const town = storeDataRaw[1];

            if (!latitude || !longitude) throw Error(`Ошибка при парсе данных на строке '${line}'`)

            return {
                position: [latitude, longitude],
                text: address,
                town
            }
        });
}