import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Set default icon for markers
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
    const [pointsData, setPointsData] = useState([]);
    const [mapCenter, setMapCenter] = useState([38.907, -77.04]); 
    const apiUrl = import.meta.env.VITE_API_URL;

    console.log("API URL:", apiUrl);
    useEffect(() => {
        async function listPoints() {
            try {
                console.log(apiUrl)            ;
                const response = await fetch(`${apiUrl}points/`);

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch points: ${response.statusText}`
                    );
                }
                const points = await response.json();
                const pointData = points.map((point, index) => ({
                    id: index,
                    name: point.name, 
                    description:point.description,
                    coordinates: [point.latitude, point.longitude]
                }));
                setPointsData(pointData);
                if (pointData.length > 0) {
                    setMapCenter(pointData[0].coordinates); 
                }
                console.log("Points list:", pointData);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        listPoints();
    }, []);
 
    const [selectedFeature, setSelectedFeature] = useState(null);

    const handleMarkerClick = (feature) => {
        setSelectedFeature({ type: "Point", ...feature });
    };

    return (
        <div style={{ display: "flex" }}>
            <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ width: "95vw", height: "90vh" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {pointsData.map((point) => (
                    <Marker
                        key={point.id}
                        position={point.coordinates}
                        eventHandlers={{
                            click: () => handleMarkerClick(point),
                        }}
                    >
                        <Popup>
                            <div>
                                <h4 >{point.name}</h4>
                                <p>
                                    {point?.description}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>
        </div>
    );
};

export default MapComponent;
