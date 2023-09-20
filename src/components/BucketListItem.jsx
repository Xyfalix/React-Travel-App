import { useState } from "react";
import { Link } from "react-router-dom";

export default function BucketListItem ({ name, country, city, id }) {

    return (
        <>
          <Link to={`/bucketlist/${id}`}>
            <p>{name}</p>
          </Link>
          <p>{country}</p>
          <p>{city}</p>
        </>
    )
}