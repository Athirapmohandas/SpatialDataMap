import React, { useState } from "react";
import './PopupForm.css';
const AddMapPoints = ({ isVisible, togglePopup ,onSubmit}) => {
    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [description, setDescription] = useState("");
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createPoint(name, latitude, longitude, description);
        setName("");
        setLatitude("");
        setLongitude("");
        setDescription("");
    };

    async function createPoint(name, latitude, longitude) {
        try {
            const response = await fetch(`${apiUrl}points/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    latitude,
                    longitude,
                    description,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            alert("Point Added Successfully!!!");
            return data;
        } catch (error) {
            console.error("Error:", error);
            alert("Error creating polygon");

        }
        if (onSubmit) {
            onSubmit();
          }
    }
    const handleClose = ()=>{
        togglePopup()
        window.location.reload(); 

    }

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
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Location Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Location name"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Latitude:
                            </label>
                            <input
                                type="number"
                                id="latitude"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                step="any"
                                placeholder="Enter latitude"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Longitude:
                            </label>
                            <input
                                type="number"
                                id="longitude"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                step="any"
                                placeholder="Enter longitude"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Description:
                            </label>
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter description"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Add Point
                        </button>
                    </form>
                    <button className="close-btn" onClick={handleClose}>Close</button>

                    </div>
                </div>
            )}
        </>
    );
};

export default AddMapPoints;
