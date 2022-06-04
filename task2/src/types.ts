export interface MapPoint {
    position: Coordinates,
    text: string,
    town: string
}

export type Coordinates = [latitude: number, longitude: number]