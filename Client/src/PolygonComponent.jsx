// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// const getColor = (density) => {
//   return density > 1000 ? '#800026' :
//          density > 500  ? '#BD0026' :
//          density > 200  ? '#E31A1C' :
//          density > 100  ? '#FC4E2A' :
//          density > 50   ? '#FD8D3C' :
//          density > 20   ? '#FEB24C' :
//          density > 10   ? '#FED976' :
//                           '#FFEDA0';
// };

// const style = (feature) => {
//   return {
//     fillColor: getColor(feature.properties.density),
//     weight: 2,
//     opacity: 1,
//     color: 'white',
//     dashArray: '3',
//     fillOpacity: 0.7
//   };
// };

// const PolygonComponent = () => {
//   const [selectedState, setSelectedState] = useState(null);
//   const [polygons, setPolygons] = useState([]); 
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null); 
//   const apiUrl = import.meta.env.VITE_API_URL;


//   useEffect(() => {
    
//     const fetchPolygons = async () => {
//         try {
//             const response = await fetch(`${apiUrl}polygons/`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch polygons');
//             }
//             const data = await response.json();
//             console.log("data",data)
//             setPolygons(data);
//             console.log("polygons,",polygons)

//         } catch (err) {
//             setError(err.message); 
//         } finally {
//             setLoading(false); 
//         }
//     };

//     fetchPolygons();
//   }, []);
//   const onEachFeature = (feature, layer) => {
//     layer.on({
//       click: () => {
//         setSelectedState({
//           name: feature.properties.name,
//           density: feature.properties.density,
//         });
//       },
//     });
//     if (feature.properties) {
//         layer.bindPopup(`
//             <div>
//                 <h4>${feature.properties.name}</h4>
//                 <p>Density: ${feature.properties.density}</p>
//             </div>
//         `);
//     }
//   };
//   useEffect(() => {
//     console.log("Updated Polygons:", polygons);
//   }, [polygons]);

//   return (
//     <div style={{ display: 'flex' }}>
//       {/* Map Container */}
//       <MapContainer center={[37.8, -96]} zoom={4} style={{ width: '75vw', height: '90vh' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
        
//         {polygons && polygons.type === 'FeatureCollection' && polygons.features.length > 0 ? (
//           <GeoJSON data={polygons} style={style} onEachFeature={onEachFeature} />
//         ) : (
//           <div>Loading...</div> 
//         )}
//       </MapContainer>
//       {selectedState && (
//                 <div style={{ width: "25vw", padding: "1rem" }}>
//                     <h2>Selected State</h2>
//                     <p><strong>Name:</strong> {selectedState.name}</p>
//                     <p><strong>Density:</strong> {selectedState.density}</p>
//                 </div>
//             )}
//     </div>
//   );
// };

// export default PolygonComponent;



import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const getColor = (density) => {
    return density > 1000
        ? "#800026"
        : density > 500
        ? "#BD0026"
        : density > 200
        ? "#E31A1C"
        : density > 100
        ? "#FC4E2A"
        : density > 50
        ? "#FD8D3C"
        : density > 20
        ? "#FEB24C"
        : density > 10
        ? "#FED976"
        : "#FFEDA0";
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
    const [selectedState, setSelectedState] = useState(null);
    const [polygons, setPolygons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchPolygons = async () => {
            try {
                const response = await fetch(`${apiUrl}polygons/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch polygons");
                }
                const data = await response.json();
                setPolygons(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPolygons();
    }, []);

    const onEachFeature = (feature, layer) => {
        // On click event for each polygon
        layer.on({
            click: () => {
                setSelectedState({
                    name: feature.properties.name,
                    density: feature.properties.density,
                });

                // Open the popup when clicking a polygon
                layer.openPopup();
            },
        });

        // Bind popup content
        if (feature.properties) {
            layer.bindPopup(`
                <div style="font-size: 14px; font-weight: bold;">
                    <h4>${feature.properties.name}</h4>
                    <p>Density: ${feature.properties.density}</p>
                </div>
            `, { closeButton: true });
        }
    };

    useEffect(() => {
        console.log("Updated Polygons:", polygons);
    }, [polygons]);

    return (
        <div style={{ display: "flex" }}>
            {/* Map Container */}
            <MapContainer
                center={[37.8, -96]}
                zoom={4}
                style={{ width: "75vw", height: "90vh" }}
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
