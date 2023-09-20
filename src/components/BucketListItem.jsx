import { useState } from "react";
import { Link } from "react-router-dom";

export default function BucketListItem ({ name, country, city, id }) {

    return (
        <>
          <Link to={`/bucketlist/${id}`}>
            <div className="bg-white shadow-md rounded-md p-2 m-2 w-96 h-24 flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold mb-2 text-center">{name}</h2>
              <p className="text-gray-700 text-center">{country}, {city}</p>
            </div>
          </Link>
        </>
    )
}