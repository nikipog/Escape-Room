import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './leaflet-style.css';

const TILE_LAYER = 'https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}';
const MAX_ZOOM_LEVEL = 19;

type LeafletMapProps = {
  coordinates: {
    lat: number;
    lng: number;
  };
  zoom: number;
};

const LeafletMap: React.FC<LeafletMapProps> = ({ coordinates, zoom }) => {
  useEffect(() => {
    const map = L.map('map').setView([coordinates.lat, coordinates.lng], zoom);

    L.tileLayer(TILE_LAYER, {
      maxZoom: MAX_ZOOM_LEVEL,
      attribution: '&copy; <a href="http://2gis.ru">2GIS</a> contributors',
    }).addTo(map);

    const marker = L.marker([coordinates.lat, coordinates.lng]).addTo(map);
    marker.bindPopup('Мы здесь!').openPopup();

    return () => {
      map.remove();
    };
  }, [coordinates, zoom]);

  return <div id="map" className="leaflet-map-container" />;
};

export default LeafletMap;
