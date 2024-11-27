import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
//import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultCenter = [40.748817, -73.985428]; // Default coordinates (example: New York City)

const GraphAddress = ({ address }) => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa==',address)
  return (
    <MapContainer center={defaultCenter} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={defaultCenter} icon={L.icon({ iconUrl: '/path-to-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })}>
        <Popup>
          {address}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default GraphAddress;
