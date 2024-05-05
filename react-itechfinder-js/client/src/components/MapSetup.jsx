import { Icon, divIcon, point } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

// create custom icon
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});
// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true),
  });
};

export default function MapSetup(props) {
  const [markerPos, setMarkerPos] = useState(null);
  const [message, setMessage] = useState(null);
  const { locationChange } = props;
  const markerRef = useRef();

  const eventHandlers = useMemo(
    () => ({
      click() {
        if (markerRef) markerRef.current.openPopup();
      },
      mouseover() {
        if (markerRef) markerRef.current.openPopup();
      },
      mouseout() {
        if (markerRef) markerRef.current.closePopup();
      },
    }),
    []
  );
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setMarkerPos([e.latlng.lat, e.latlng.lng]);
        locationChange([e.latlng.lat, e.latlng.lng]);
        setMessage('Location Saved!');
      },
    });
    return false;
  };

  return (
    <MapContainer center={[14.679128100971061, 120.5409143727036]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        scrollWheelZoom={true}
      />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
        {markerPos === null ? null : (
          <Marker ref={markerRef} position={markerPos} icon={customIcon} eventHandlers={eventHandlers}>
            <Popup>{message}</Popup>
          </Marker>
        )}

        <MapEvents />
      </MarkerClusterGroup>
    </MapContainer>
  );
}
