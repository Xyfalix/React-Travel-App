import { useState, useEffect } from "react";
import DestinationListItem from "./DestinationListItem";

export default function DestinationList({ places }) {
    const [destinationListItems, setDestinationListItems] = useState([]);
  
    useEffect(() => {
      if (places && places.length > 0) {
        // Create an array of DestinationListItem components
        const items = places.map((place) => (
          <DestinationListItem
            key={place.properties.place_id}
            placeName={place.properties.name}
            placeId={place.properties.place_id}
          />
        ));
  
        // Update the state with the mapped items
        setDestinationListItems(items);
      }
    }, [places]);
  
    return (
        <div>
            {destinationListItems}
        </div>
    )
  }
  
  
  
  
  
  
  
