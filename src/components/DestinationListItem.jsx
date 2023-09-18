import { useState } from "react";
import { Link } from "react-router-dom";

export default function DestinationListItem ({ placeName, placeId }) {
    return (
        <>
          <Link to={`/destination/${placeId}`}>
            <p>{placeName}</p>
          </Link>
        </>
    )   
}