import { useState } from "react";
import { Link } from "react-router-dom";

export default function BucketListItem ({ name, country, city, address, contactNumber, website, openingHours }) {
    return (
        <>
            <p>{name}</p>
            <p>{country}</p>
            <p>{city}</p>
            <p>{address}</p>
            <p>{contactNumber}</p>
            <p>{website}</p>
            <p>{openingHours}</p>
        </>
    )
}