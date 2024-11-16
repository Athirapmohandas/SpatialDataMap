import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AddPolygonPoints from "./AddPolygonPoints";

// polygon coordinates

// const polygondata = [[6.9271, 79.9803],
// [7.8731, 80.1261],
// [7.1348, 81.0593],
// [6.1110, 80.5116],
// [5.9390, 79.8520],
// [6.9271, 79.9803]]

const getColor = (density) => {
    return density > 1000
        ? "#F9BB6C"
        : density > 500
        ? "#F5F5F5"
        : density > 200
        ? "#F9BB6C"
        : density > 100
        ? "#F77051"
        : density > 50
        ? "#FCF0AC"
        : "#F79F5A";
};

const style = (feature) => {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
    };
};

const PolygonComponent = () => {
    const [mapCenter, setMapCenter] = useState([20.59, 78.96]);
    const mapRef = useRef(null);
    const [polygons, setPolygons] = useState([]);
    const [showPopup, SetShowPopup] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchPolygons = async () => {
        try {
            const response = await fetch(`${apiUrl}polygons/`);
            if (!response.ok) {
                throw new Error("Failed to fetch polygons");
            }
            const data = await response.json();
            console.log("data", data);
            console.log("center", data.features[0].geometry.coordinates[0][0]);

            if (data && data.features && data.features.length > 0) {
                const firstPolygon = data.features[0];
                const coordinates = firstPolygon.geometry.coordinates[0];
                const firstCoordinate = coordinates[0];
                setMapCenter([firstCoordinate[1], firstCoordinate[0]]);
            }
            setPolygons(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchPolygons();
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            console.log("mapcenter");
            mapRef.current.setView(mapCenter, mapRef.current.getZoom()); // Set map center
        }
        console.log("mapcenter", mapCenter);
    }, [mapCenter]);

    const onEachFeature = (feature, layer) => {
        if (feature.properties) {
            layer.bindPopup(
                `
                <div style="font-size: 14px; font-weight: bold;">
                    <h4>${feature.properties.name}</h4>
                    <div>Density: ${feature.properties.density} 
                    <span  style=" font-style:italic ; font-weight: normal">people per square mile</span></div>
                </div>
            `,
                { closeButton: true }
            );
        }
    };

    useEffect(() => {
        console.log("Updated Polygons:", polygons);
    }, [polygons]);

    const handleSubmit = () => {
        fetchPolygons();
    };
    const togglePopupShow = () => {
        SetShowPopup(!showPopup);
    };
    return (
        <div className="flex flex-col justify-start items-start ml-[5%]">
            <button
                className=" bg-gray-200 rounded-lg p-3 mb-6"
                onClick={togglePopupShow}
            >
                Add Polygon Points
            </button>
            <AddPolygonPoints
                isVisible={showPopup}
                togglePopup={togglePopupShow}
                onSubmit={handleSubmit}
            />

            <MapContainer
                center={mapCenter}
                zoom={4}
                style={{ width: "90vw", height: "90vh" }}
                ref={mapRef}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {polygons &&
                polygons.type === "FeatureCollection" &&
                polygons.features.length > 0 ? (
                    <GeoJSON
                        data={polygons}
                        style={style}
                        onEachFeature={onEachFeature}
                    />
                ) : (
                    <div>Loading...</div>
                )}
            </MapContainer>
        </div>
    );
};

export default PolygonComponent;
