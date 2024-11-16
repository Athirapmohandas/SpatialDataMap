import "./App.css";
import MapComponent from "./MapComponent";
import PolygonComponent from "./PolygonComponent";
import { useEffect, useState } from "react";

function App() {
    const [showComponent, setShowComponent] = useState("map");
    const handleClick = (data) => {
        setShowComponent(data);
        localStorage.setItem("selectedComponent", data);
    };
    useEffect(() => {
        const savedComponent = localStorage.getItem("selectedComponent");
        if (savedComponent) {
            setShowComponent(savedComponent);
        }
    }, []);
    return (
        <>
            <h1 className="pt-[1%] pl-[5%] pb-3 text-red-500 font-bold text-[30px] uppercase">
                Spatial Data Map
            </h1>
            <div className="mb-4">
                <button
                    onClick={() => handleClick("map")}
                    className={`px-7 py-4 text-gray-800 rounded-md mr-4 ml-[5%] ${
                        showComponent === "map" ? "bg-blue-400" : "bg-blue-200"
                    }`}
                >
                    Show multiple Point data Map
                </button>
                <button
                    onClick={() => handleClick("polygon")}
                    className={`px-7 py-4 text-gray-800 rounded-md ${
                        showComponent === "polygon"
                            ? "bg-green-400"
                            : "bg-green-200"
                    }`}
                >
                    Show Polygon Data Map
                </button>
            </div>
            {showComponent === "map" && <MapComponent />}
            {showComponent === "polygon" && <PolygonComponent />}
        </>
    );
}

export default App;
