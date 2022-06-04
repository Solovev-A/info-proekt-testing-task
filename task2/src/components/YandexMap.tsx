import React, { FC } from 'react';
import { Clusterer, Map, Placemark, YMaps } from 'react-yandex-maps';
import { Coordinates, MapPoint } from '../types';


export interface YandexMapProps {
    center: Coordinates,
    zoom: number,
    width: number,
    height: number,
    points: MapPoint[]
}

export const YandexMap: FC<YandexMapProps> = (props) => {
    return (
        <YMaps>
            <Map
                state={{ center: props.center, zoom: props.zoom }}
                width={props.width}
                height={props.height}
                modules={
                    ['geoObject.addon.balloon', 'geoObject.addon.hint']
                }
            >
                <Clusterer>
                    {props.points.map((point) =>
                        <Placemark
                            key={point.position[0] + point.text + point.position[1]}
                            geometry={point.position}
                            properties={{
                                balloonContent: point.text,
                            }}
                        />)
                    }
                </Clusterer>
            </Map>
        </YMaps>
    )
}