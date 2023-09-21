import { useState } from "react";
import { Link } from "react-router-dom";

export default function DestinationListItem ({ placeName, placeId }) {
    return (
        <>
          <Link to={`/destination/${placeId}`}>
            <p className="text-blue-400 hover:text-orange-400 px-3 py-2">{placeName}</p>
          </Link>
        </>
    )   
}