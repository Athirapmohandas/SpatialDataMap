import React, { useState } from "react";
import "./PopupForm.css";

import axios from "axios";
const AddPolygonPoints = ({ isVisible, togglePopup, onSubmit }) => {
    const [name, setName] = useState("");
    const [density, setDensity] = useState("");
    const [coordinates, setCoordinates] = useState("");
    const [polygons, setPolygons] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        console.log("clicked");
        e.preventDefault();

        const polygonData = {
            name,
            density: parseFloat(density),
            area: JSON.parse(coordinates),
        };

        try {
            const response = await axios.post(
                `${apiUrl}polygons/`,
                polygonData
            );

            setPolygons([
                ...polygons,
                {
                    type: "Feature",
                    properties: {
                        name: response.data.name,
                        density: response.data.density,
                    },
                    geometry: {
                        type: "Polygon",
                        coordinates: [response.data.area],
                    },
                },
            ]);
            alert("Successfully added polygon point")
            setName("");
            setDensity("");
            setCoordinates("");
        } catch (error) {
            console.error("Error creating polygon:", error);
            alert("Error creating polygon")

        }
        if (onSubmit) {
            onSubmit();  // Trigger the parent's fetchPolygons function
          }
    };
    const handleClose = (()=>{
        togglePopup()
        window.location.reload(); 

    })
    return (
        <>
            {isVisible && (
                <div className="popup-overlay">
                    <div className="popup">
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Location Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Enter Location Name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="density"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Density:
                                </label>
                                <input
                                    type="number"
                                    id="density"
                                    value={density}
                                    onChange={(e) => setDensity(e.target.value)}
                                    required
                                    placeholder="Enter Population Density"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="coordinates"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Coordinates:
                                </label>
                                <textarea
                                    id="coordinates"
                                    value={coordinates}
                                    onChange={(e) =>
                                        setCoordinates(e.target.value)
                                    }
                                    required
                                    placeholder="[[longitude, latitude], [longitude, latitude], ...]"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows="4"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Add Polygon
                            </button>
                        </form>
                        <button className="close-btn" onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddPolygonPoints;
