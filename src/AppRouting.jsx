import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import DestinationDetail from "./components/DestinationDetail";
import DestinationList from "./components/DestinationList";
import BucketList from "./components/BucketList";
import BucketListDetail from "./components/BucketListDetail";


export default function AppRouting() {
    const [places, setPlaces] = useState(null);
    const [bucketListItems, setBucketListItems] = useState([]);

    const updatePlaces = (newPlaces) => {
        setPlaces(newPlaces)
    }

    const updateBucketList = (newBucketListItem) => {
        setBucketListItems(newBucketListItem)
    }

    return (
      <div>
        <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/destination/:id" element={<DestinationDetail places={places} />} />
            <Route exact path="/search/:searchTerm/" element={<DestinationList onUpdatePlaces={updatePlaces}/> } />
            <Route exact path="/bucketlist" element={<BucketList onUpdateBucketList={updateBucketList} />} />
            <Route exact path="/bucketlist/:id" element={<BucketListDetail bucketListItems={bucketListItems} />} />
        </Routes>
      </div>

    );
}