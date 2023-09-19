import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DestinationDetail({ places }) {

    const { id } = useParams();

    // Find the place with the matching place_id to display

    const place = places.find((place) => place.properties.place_id === id);
    console.log(place);
    const name = place.properties.name ?? "Name not available";
    const address = place.properties.address_line2 ?? "Address not available"
    const openingHours = place.properties.datasource.raw.opening_hours ?? "Opening hours not available"
    const contactNumber = place.properties.datasource.raw.phone ?? "Contact number not available"
    const website = place.properties.datasource.raw.website ?? "Website address not available"


    const navigate = useNavigate();
    
    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <div>
          <h2>Destination Details</h2>
          <p>Name: {name}</p>
          <p>Address: {address}</p>
          <p>Opening Hours: {openingHours} </p>
          <p>Contact Number: {contactNumber}  </p>
          <p>Website: {website} </p>
          <button onClick={handleGoBack}>Back to Search Results</button>
        </div>
      );

}