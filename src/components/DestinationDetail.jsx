import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DestinationDetail({ places }) {

    const { id } = useParams();
    const navigate = useNavigate();
    
    const handleGoBack = () => {
        navigate('/');
    }

    return (
        <div>
          <h2>Destination Detail</h2>
          <p>Destination ID: {id}</p>
          {/* Display detailed information here */}
          <button onClick={handleGoBack}>Back to Main Page</button>
        </div>
      );

}