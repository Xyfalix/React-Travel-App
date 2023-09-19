import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactModal from "react-modal";

export default function DestinationDetail({ places }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const { id } = useParams();
    const airtableBaseUrl = "https://api.airtable.com/v0/appM7fecKbQfZQS1K";
    const tableId = "tbl5EnYF9tLKhqfuv";
    const airtableToken = "patmFkDXfa3orGMQc.db60d07c85760f1a9468fd82ce261852cf1097128e14787a1b59036f6ff92d7b";


    const place = places.find((place) => place.properties.place_id === id);
    console.log(place);
    const name = place.properties.name ?? "Name not available";
    const country = place.properties.country ?? "Country data not available"
    const city = place.properties.city ?? "City data not available"
    const address = place.properties.address_line2 ?? "Address not available"
    const openingHours = place.properties.datasource.raw.opening_hours ?? "Opening hours not available"
    const contactNumber = place.properties.datasource.raw.phone ?? "Contact number not available"
    const website = place.properties.datasource.raw.website ?? "Website address not available"


    const navigate = useNavigate();
    
    const handleGoBack = () => {
        navigate(-1);
    }

    const addToBucketList = async () => {

        const newDestination = {
          "fields": {
            "name": `${name}`,
            "country": `${country}`,
            "city": `${city}`,
            "address": `${address}`,
            "opening_hours": `${openingHours}`,
            "contact_number": `${contactNumber}`,
            "website": `${website}`
          }
        };
    
        try {
            const response = await fetch(`${airtableBaseUrl}/${tableId}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${airtableToken}`,
              },
              body: JSON.stringify(newDestination),
            });
        
            if (response.ok) {
              setModalContent("Added to Bucket List successfully!");
            } else {
              setModalContent("Failed to add to Bucket List.");
            }
          } catch (error) {
            setModalContent("A Network error occurred.");
          } finally {
            setModalIsOpen(true);
          }
    };
    

    return (
        <div>
          <h2>Destination Details</h2>
          <p>Name: {name}</p>
          <p>Country: {country}</p>
          <p>City: {city}</p>
          <p>Address: {address}</p>
          <p>Opening Hours: {openingHours} </p>
          <p>Contact Number: {contactNumber}  </p>
          <p>Website: {website} </p>
          <button onClick={addToBucketList}>Add to Bucket List</button>
          <button onClick={handleGoBack}>Back to Search Results</button>

          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Modal"
          >
            <p>{modalContent}</p>
            <button onClick={() => setModalIsOpen(false)}>Close</button>
          </ReactModal>

        </div>
      );

}