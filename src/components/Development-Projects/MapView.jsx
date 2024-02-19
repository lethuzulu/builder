import * as React from 'react'
import Map, { Source, Layer } from 'react-map-gl'
import joburg from '../../data/johannesburg.json'
import centroids from '../../data/centroid.json'
import 'mapbox-gl/dist/mapbox-gl.css'
import config from '../../config.json'

const lineStyle = {
    id: 'lines',
    type: 'line',
    layout: {},
    paint: {
        'line-color': '#71797E',
        'line-width': 0.5,
    },
}

const centroidPoints = {
    id: 'label',
    type: 'symbol',
    source: 'centroid_points',
    layout: {
        'text-field': ['format', ['get', 'zone_id'], { 'font-scale': 0.65 }],
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    },
    paint: {
        'text-color': 'black',
        'text-opacity': 0.9,
    },
}

const fillStyle = {
    id: 'fill',
    type: 'fill',
    layout: {},
    paint: {
        'fill-color': '#01366a',
        'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            1,
            0.0,
        ],
    },
}

export default function MapView({ append, remove, getValues }) {
    const mapRef = React.useRef()

    const [viewState, setViewState] = React.useState(
        config.initial_map_settings
    )

    const handleClick = (e) => {
        try {
            const featureState = mapRef.current.getFeatureState({
                source: 'polygons',
                id: e.features[0]['id'],
            })
            if (Object.keys(featureState).length === 0) {
                mapRef.current.setFeatureState(
                    { source: 'polygons', id: e.features[0]['id'] },
                    { selected: true }
                )
                let zone_id = e.features[0]['properties']['zone_id']
                append(zone_id)
            }
            if (Object.keys(featureState).length !== 0) {
                mapRef.current.setFeatureState(
                    { source: 'polygons', id: e.features[0]['id'] },
                    { selected: false }
                )
                let zone_id = e.features[0]['properties']['zone_id']
                let index = getValues('zone_id').findIndex(
                    (zone) => zone === zone_id
                )
                remove(index)
                mapRef.current.removeFeatureState({
                    source: 'polygons',
                    id: e.features[0]['id'],
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Map
            ref={mapRef}
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            onClick={handleClick}
            style={{ width: '100%', height: 600 }}
            mapStyle='mapbox://styles/mapbox/streets-v9'
            mapboxAccessToken={config.MAPBOX_TOKEN}
            interactiveLayerIds={['fill']}
            maxBounds={[config.map_bounds.sw, config.map_bounds.ne]}>
            <Source
                id='polygons'
                type='geojson'
                data={joburg}
                generateId={true}>
                <Layer {...lineStyle} />
                <Layer {...fillStyle} />
            </Source>
            <Source
                id='centroids'
                type='geojson'
                data={centroids}>
                <Layer {...centroidPoints} />
            </Source>
        </Map>
    )
}
