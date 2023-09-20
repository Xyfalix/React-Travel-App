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
            setModalContent("A network error occurred.");
          } finally {
            setModalIsOpen(true);
          }
    };
    

    return (
        <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center">
          
          <h2 className="text-2xl text-gray-50 px-3 py-1 underline">Destination Details</h2>
          <div className="bg-white shadow-md rounded-md p-4 m-2 w-96 h-60 flex flex-col justify-center"> 
            <p>Name: {name}</p>
            <p>Country: {country}</p>
            <p>City: {city}</p>
            <p>Address: {address}</p>
            <p>Opening Hours: {openingHours} </p>
            <p>Contact Number: {contactNumber}  </p>
            <p>Website: {website} </p>
          </div>
          <div>
            <button className="border-solid border-green-600 border-2 text-gray-50 px-3 py-1 mx-5" onClick={addToBucketList}>Add to Bucket List</button>
            <button className="border-solid border-green-600 border-2 text-gray-50 px-3 py-1 mx-5" onClick={handleGoBack}>Back to Search Results</button>
          </div>
          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Modal"
            ariaHideApp={false}
          >
            <p>{modalContent}</p>
            <button onClick={() => setModalIsOpen(false)}>Close</button>
          </ReactModal>

        </div>
      );

}