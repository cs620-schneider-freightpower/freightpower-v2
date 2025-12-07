"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix for default marker icons in Next.js
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

interface MapProps {
    pickup: {
        city: string;
        state: string;
        latitude?: number;
        longitude?: number;
    };
    delivery: {
        city: string;
        state: string;
        latitude?: number;
        longitude?: number;
    };
}

// Coordinate Lookup Table for Demo
const CITY_COORDINATES: Record<string, [number, number]> = {
    "COLUMBUS, OH": [39.9612, -82.9988],
    "PITTSBURGH, PA": [40.4406, -79.9959],
    "FORT LAUDERDALE, FL": [26.1224, -80.1373],
    "RICHMOND, VA": [37.5407, -77.4360],
    "WACO, TX": [31.5493, -97.1467],
    "ORLANDO, FL": [28.5383, -81.3792],
    "JOLIET, IL": [41.5250, -88.0817],
    "FAYETTEVILLE, NC": [35.0527, -78.8784],
    "LAREDO, TX": [27.5036, -99.5076],
    "NASHVILLE, TN": [36.1627, -86.7816],
    "BOSTON, MA": [42.3601, -71.0589],
    "ANN ARBOR, MI": [42.2808, -83.7430],
    "SAN ANTONIO, TX": [29.4241, -98.4936],
    "ALLENTOWN, PA": [40.6023, -75.4714],
    "AKRON, OH": [41.0814, -81.5190],
    "LANCASTER, PA": [40.0379, -76.3055],
    "NEW ORLEANS, LA": [29.9511, -90.0715],
    "MILWAUKEE, WI": [43.0389, -87.9065],
    "KENT, WA": [47.3809, -122.2348],
    "YONKERS, NY": [40.9312, -73.8988],
    "HARRISBURG, PA": [40.2732, -76.8867],
    "TAMPA, FL": [27.9506, -82.4572],
    "SAN FRANCISCO, CA": [37.7749, -122.4194],
    "NORFOLK, VA": [36.8508, -76.2859],
    "AURORA, IL": [41.7606, -88.3201],
    "MEMPHIS, TN": [35.1495, -90.0490],
    "FLINT, MI": [43.0125, -83.6875],
    "VANCOUVER, WA": [45.6318, -122.6716],
    "SPOKANE, WA": [47.6588, -117.4260],
    "KENOSHA, WI": [42.5847, -87.8212],
    "MADISON, WI": [43.0731, -89.4012],
    "DALLAS, TX": [32.7767, -96.7970],
    "MINNEAPOLIS, MN": [44.9778, -93.2650],
    "KANSAS CITY, MO": [39.0997, -94.5786],
    "DETROIT, MI": [42.3314, -83.0458],
    "GREEN BAY, WI": [44.5133, -88.0133],
    "CHICAGO, IL": [41.8781, -87.6298],
    "OAKLAND, CA": [37.8044, -122.2711],
    "GARY, IN": [41.5934, -87.3464],
    "MARION, IN": [40.5586, -85.6601],
    "HANOVER PARK, IL": [41.9868, -88.1481],
    "ROCHELLE, IL": [41.9213, -89.0664],
    "MODESTO, CA": [37.6393, -120.9969],
    "FRESNO, CA": [36.7378, -119.7871],
    "AUSTIN, TX": [30.2672, -97.7431],
    "PORTLAND, OR": [45.5152, -122.6784],
    "DENVER, CO": [39.7392, -104.9903],
    "SEATTLE, WA": [47.6062, -122.3321],
    "ATLANTA, GA": [33.7490, -84.3880],
};

function getCoordinates(city: string, state: string, lat?: number, lon?: number): [number, number] | null {
    if (lat && lon) return [lat, lon];
    const key = `${city.toUpperCase()}, ${state.toUpperCase()}`;
    return CITY_COORDINATES[key] || null;
}

// Component to adjust map bounds to fit markers
function MapBounds({ bounds }: { bounds: L.LatLngBoundsExpression }) {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [bounds, map]);
    return null;
}

export default function Map({ pickup, delivery }: MapProps) {
    const pickupCoords = getCoordinates(pickup.city, pickup.state, pickup.latitude, pickup.longitude);
    const deliveryCoords = getCoordinates(delivery.city, delivery.state, delivery.latitude, delivery.longitude);

    if (!pickupCoords || !deliveryCoords) {
        return (
            <div className="w-full h-[250px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                Map unavailable for these locations
            </div>
        );
    }

    const bounds = L.latLngBounds([pickupCoords, deliveryCoords]);

    return (
        <div className="w-full h-[300px] rounded-xl overflow-hidden shadow-sm border border-gray-200 z-0">
            <MapContainer
                zoom={13}
                center={pickupCoords} // Initial center, will be overridden by bounds
                style={{ height: '100%', width: '100%', zIndex: 0 }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={pickupCoords}>
                    <Popup>
                        <strong>Pickup</strong><br />
                        {pickup.city}, {pickup.state}
                    </Popup>
                </Marker>

                <Marker position={deliveryCoords}>
                    <Popup>
                        <strong>Delivery</strong><br />
                        {delivery.city}, {delivery.state}
                    </Popup>
                </Marker>

                <Polyline
                    positions={[pickupCoords, deliveryCoords]}
                    color="orange"
                    weight={4}
                    opacity={0.7}
                    dashArray="10, 10"
                />

                <MapBounds bounds={bounds} />
            </MapContainer>
        </div>
    );
}
