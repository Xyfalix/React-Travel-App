import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactModal from "react-modal";

export default function BucketListDetail({ bucketListItems }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsClosed, setModalIsClosed] = useState(false);
    const [modalContent, setModalContent] = useState("");
    
    const { id } = useParams();
    const airtableBaseUrl = "https://api.airtable.com/v0/appM7fecKbQfZQS1K";
    const tableId = "tbl5EnYF9tLKhqfuv";
    const airtableToken = "patmFkDXfa3orGMQc.db60d07c85760f1a9468fd82ce261852cf1097128e14787a1b59036f6ff92d7b";
    
    console.log(bucketListItems);
    const bucketListItem = bucketListItems.find((bucketListItem) => bucketListItem.props.id === id);
    console.log(`Bucket List Item is ${bucketListItem}`);
    const name = bucketListItem.props.name;
    const country = bucketListItem.props.country;
    const city = bucketListItem.props.city;
    const address = bucketListItem.props.address;
    const openingHours = bucketListItem.props.openingHours;
    const contactNumber = bucketListItem.props.contactNumber;
    const website = bucketListItem.props.website;

    const navigate = useNavigate();
    
    const handleGoBack = () => {
        navigate(-1);
    }

    const deleteBucketListItem = async () => {
        try {
            const response = await fetch(`${airtableBaseUrl}/${tableId}/${bucketListItem.props.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${airtableToken}`,
            },
            });
            if (response.ok) {
              setModalContent("Successfully deleted Bucket List Item!")
            } else {
              setModalContent("Failed to delete Bucket List Item")
            }
        } catch (error) {
          setModalContent("A network error occurred");
        } finally {
          setModalIsOpen(true);
        }
      };

      // Perform the redirect after user clicks the Close button on the modal
      if (modalIsClosed) {
        navigate("/bucketlist");
      }
      
    return (
        <>
          <h2>Bucket List Item Details</h2>
          <p>Name: {name}</p>
          <p>Country: {country}</p>
          <p>City: {city}</p>
          <p>Address: {address}</p>
          <p>Opening Hours: {openingHours} </p>
          <p>Contact Number: {contactNumber}  </p>
          <p>Website: {website} </p>
          <button onClick={handleGoBack}>Back to Bucket List</button>
          <button onClick={deleteBucketListItem}>Delete Bucket List Item</button>

          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Modal"
          >
            <p>{modalContent}</p>
            <button onClick={() => {setModalIsOpen(false); setModalIsClosed(true)}}>Close</button>
          </ReactModal>

        </>
    );
}