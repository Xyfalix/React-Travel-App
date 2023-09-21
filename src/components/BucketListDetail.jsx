import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";

export default function BucketListDetail({ bucketListItems }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isCheckboxToggled, setIsCheckboxToggled] = useState(false);
    
    const { id } = useParams();
    const airtableBaseUrl = "https://api.airtable.com/v0/appM7fecKbQfZQS1K";
    const tableId = "tbl5EnYF9tLKhqfuv";
    const airtableToken = "patmFkDXfa3orGMQc.db60d07c85760f1a9468fd82ce261852cf1097128e14787a1b59036f6ff92d7b";
    
    console.log(bucketListItems);
    const bucketListItem = bucketListItems.find((bucketListItem) => bucketListItem.id === id);
    console.log(`Bucket List Item is ${bucketListItem}`);
    const name = bucketListItem.fields.name;
    const country = bucketListItem.fields.country;
    const city = bucketListItem.fields.city;
    const address = bucketListItem.fields.address;
    const openingHours = bucketListItem.fields.opening_hours;
    const contactNumber = bucketListItem.fields.contact_number;
    const website = bucketListItem.fields.website;
    console.log(`visited field is ${bucketListItem.fields.visited}`)
   
    useEffect(() => {
      // Initialize isChecked based on bucketListItem.fields.visited when the component mounts
      if (bucketListItem) {
        if (bucketListItem.fields.visited) {
          setIsChecked(true);
        } else {
          setIsChecked(false);
        }
      }
    }, []);

    const navigate = useNavigate();
    
    const handleGoBack = () => {
        navigate(-1);
    }

    const handleCheckboxChange = () => {
      setIsCheckboxToggled(true);
      setIsChecked((prev) => !prev);
    }

    useEffect(() => {
      if (isCheckboxToggled) {
        const updateBucketListItem = async () => {
          const updateVisited = {
            "fields": {
              "visited": isChecked
            }
          };

          try {
            const response = await fetch(`${airtableBaseUrl}/${tableId}/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${airtableToken}`,
              },
              body: JSON.stringify(updateVisited),
            });

            if (response.ok) {
              console.log("Update Successful");
            } else {
              console.error("Failed to update");
            }
          } catch (error) {
            console.error(error);
          } finally {
            setIsCheckboxToggled(false);
          }
        };

        updateBucketListItem();
      }
    }, [isCheckboxToggled]);
    

    const deleteBucketListItem = async () => {
        try {
            const response = await fetch(`${airtableBaseUrl}/${tableId}/${bucketListItem.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${airtableToken}`,
            },
            });
            if (response.ok) {
              setModalContent("Successfully deleted Bucket List Item!")
              setModalIsOpen(true);
              setIsDeleteSuccessful(true);
            } else {
              setModalContent("Failed to delete Bucket List Item")
            }
        } catch (error) {
          setModalContent("A network error occurred");
        } finally {
          setModalIsOpen(true);
        }
  };

    // Perform a redirect after user clicks the Close button on the modal on a successful delete
    useEffect(() => {
      if (isDeleteSuccessful && !modalIsOpen) {
        navigate("/bucketlist");
      }
    }, [isDeleteSuccessful, modalIsOpen])

    return (
        <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-2xl text-gray-50 px-3 py-1 underline">Bucket List Item Details</h2>
          <div className="bg-white shadow-md rounded-md p-4 m-2 w-96 min-h-fit flex flex-col justify-center">
            <p>Name: {name}</p>
            <p>Country: {country}</p>
            <p>City: {city}</p>
            <p>Address: {address}</p>
            <p>Opening Hours: {openingHours} </p>
            <p>Contact Number: {contactNumber}  </p>
            <p>Website: {website} </p>
          </div>

          <div className="my-4">
            <label className="text-gray-50">
                <input 
                  type="checkbox"
                  className="mr-2"
                  checked={isChecked} 
                  onChange={handleCheckboxChange}
                /> Been There Done That!
            </label>
          </div>

          <div>
            <button className="border-solid border-green-600 border-2 text-gray-50 px-3 py-1 mx-14" onClick={handleGoBack}>Back to Bucket List</button>
            <button className="border-solid border-green-600 border-2 text-gray-50 px-3 py-1 mx-14" onClick={deleteBucketListItem}>Delete Item</button>
          </div>
          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Modal"
            ariaHideApp={false}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-gray-50 p-4 max-w-5xl max-h-5xl overflow-auto rounded-lg shadow-md flex flex-col items-center"
          >
            <p>{modalContent}</p>
            <button className="text-gray-50 hover:text-blue-700 border-green-600 border-2 px-3 mt-5" onClick={() => {setModalIsOpen(false);}}>Close</button>
          </ReactModal>

        </div>
    );
}