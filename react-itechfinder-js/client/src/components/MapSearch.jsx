import { Icon, divIcon, point } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import SocialLinks from './SocialLinks';
import Star from './Star';

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

export default function MapSearch(props) {
  const { search } = props;

  const markerRef = useRef();
  return (
    <MapContainer center={[14.679902793487273, 120.54083803222784]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        scrollWheelZoom={true}
      />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
        {search &&
          search?.map((shopData) => (
            <Marker key={shopData._id} ref={markerRef} position={shopData?.geoCode} icon={customIcon}>
              <Popup>
                {
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2">
                      <div className="flex size-12 justify-center items-center bg-slate-400 text-white font-bold rounded-xl uppercase">
                        <span className="text-lg self-center text-center">
                          {shopData.shopName
                            .split(' ')
                            .map((name) => name[0])
                            .join('')}
                        </span>
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-xl truncate">{shopData?.shopName}</div>
                        <div className="text-xs opacity-70 capitalize">{shopData?.ownerName}</div>
                        <div className="text-xs opacity-70 capitalize">
                          {shopData?.shopAddress.shopStreet}, {shopData?.shopAddress.shopBarangay},{' '}
                          {shopData?.shopAddress.shopCity}, {shopData?.shopAddress.shopProvince}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex flex-row gap-1 items-center">
                        <Star reviews={shopData?.raters} stars={shopData?.rating / shopData?.raters} />
                      </div>
                      <span className="text-xs">
                        <strong>Services Offered:</strong>{' '}
                        <span className="capitalize italic badge badge-primary badge-sm text-white">
                          {shopData?.shopType.join(', ')}
                        </span>
                      </span>
                      <span className="text-xs">
                        <strong>Gadget List:</strong>
                        <span className="capitalize italic text-blue-700 px-2">
                          {shopData?.gadgetList.join(', ')}
                        </span>
                      </span>
                    </div>
                    <SocialLinks
                      facebook={shopData?.socialLinks.facebook}
                      instagram={shopData?.socialLinks.instagram}
                      twitter={shopData?.socialLinks.twitter}
                      tiktok={shopData?.socialLinks.tiktok}
                      youtube={shopData?.socialLinks.youtube}
                      linkedin={shopData?.socialLinks.linkedin}
                    />
                    <div className="flex-1">
                      <a
                        href={`https://www.google.com/maps/@${shopData?.geoCode.join(',')},15z?entry=ttu`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <button className="btn google-btn grow w-full">
                          {' '}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                            />
                          </svg>
                          View on Google Maps
                        </button>
                      </a>
                    </div>
                  </div>
                }
              </Popup>
            </Marker>
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
