import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import AddMapPoints from "./AddMapPoints";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
    
    const mapRef = useRef(null); 
    const [pointsData, setPointsData] = useState([]);
    const [mapCenter, setMapCenter] = useState([20.59, 78.96]);

    const [showPopup, SetShowPopup] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const togglePopupShow = () => {
        SetShowPopup(!showPopup);
    };
    const apiUrl = import.meta.env.VITE_API_URL;

    console.log("API URL:", apiUrl);
    async function listPoints() {
        try {
            console.log(apiUrl);
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
                description: point.description,
                coordinates: [point.latitude, point.longitude],
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
    useEffect(() => {
        listPoints();
        
    }, []);
    
    const handleSubmit = () => {
        listPoints();
    };
    useEffect(() => {
        if (mapRef.current) {
          mapRef.current.setView(mapCenter, mapRef.current.getZoom()); // Set map center
        }
      }, [mapCenter]);
    const handleMarkerClick = (feature) => {
        setSelectedFeature({ type: "Point", ...feature });
    };
    return (
        <div className="flex flex-col justify-start items-start ml-[5%]">
            <button
                className=" bg-gray-200 rounded-lg p-3 mb-6"
                onClick={togglePopupShow}
            >
                Add Map Points
            </button>
            <AddMapPoints
                isVisible={showPopup}
                togglePopup={togglePopupShow}
                onSubmit={handleSubmit}
            />
            <MapContainer
                center={mapCenter}
                zoom={10}
                style={{ width: "90vw", height: "90vh" }}
                ref={mapRef}
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
                            
                            <div className="text-[14px] font-bold">
                                <h4>{point.name}</h4>
                                <p>{point.description}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
