import { useState } from "react";
import DestinationListItem from "./DestinationListItem";

export default function DestinationList({ places }) {
    return (
      <div>
        {places.map((place) => (
          <DestinationListItem 
            key={place.properties.place_id}
            placeName={place.properties.name}
            placeId={place.properties.place_id}
          />
        ))}
      </div>
    );
  }
