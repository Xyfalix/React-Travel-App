import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import DestinationDetail from "./components/DestinationDetail";
import DestinationList from "./components/DestinationList";


export default function AppRouting() {
    const [places, setPlaces] = useState(null);
    const [searchCity, setSearchCity] = useState(null);
    
    const updateCity = () => {
        setSearchCity();
    }

    return (
      <div>
        <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/destination/:id" element={<DestinationDetail places={places} />} />
            <Route exact path={`/search/:searchTerm/`} element={<DestinationList/> } />
        </Routes>
      </div>

    );
}