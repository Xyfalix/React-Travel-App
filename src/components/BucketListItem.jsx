import { useState } from "react";
import { Link } from "react-router-dom";

export default function BucketListItem ({ name, country, city, id }) {

    return (
        <>
          <Link to={`/bucketlist/${id}`}>
            <p>Name: {name}</p>
          </Link>
          <p>Country: {country}</p>
          <p>City: {city}</p>
        </>
    )
}