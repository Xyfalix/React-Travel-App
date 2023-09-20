import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BucketListItem from "./BucketListItem";

export default function BucketList({ onUpdateBucketList }) {
    const [bucketListData, setBucketListData] = useState(null);
    const [bucketListItems, setBucketListItems] = useState([]);

    // Airtable params
    const airtableBaseUrl = "https://api.airtable.com/v0/appM7fecKbQfZQS1K";
    const tableId = "tbl5EnYF9tLKhqfuv";
    const airtableToken = "patmFkDXfa3orGMQc.db60d07c85760f1a9468fd82ce261852cf1097128e14787a1b59036f6ff92d7b";

    useEffect(() => {
        const fetchBucketList = async () => {
          const response = await fetch(`${airtableBaseUrl}/${tableId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${airtableToken}`,
            },
          });
          const responseData = await response.json();
          console.log(responseData);
          setBucketListData(responseData.records);
        };

        fetchBucketList();
    }, []);
    
    useEffect(() => {
        if (bucketListData) {
          // Create an array of BucketListItem Components
          const items = bucketListData.map((bucketListItem) => (
            <BucketListItem
              key={bucketListItem.id}
              id={bucketListItem.id}
              country={bucketListItem.fields.country}
              city={bucketListItem.fields.city}
              name={bucketListItem.fields.name}
              address={bucketListItem.fields.address}
              contactNumber={bucketListItem.fields.contact_number}
              website={bucketListItem.fields.website}
              openingHours={bucketListItem.fields.opening_hours}
            />
          ));
            console.log(items);
            setBucketListItems(items);
            // update bucket list in AppRouting to pass down as a prop to BucketListDetail
            onUpdateBucketList(bucketListItems)
          }
    }, [bucketListData]);

    return (
      <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl text-black-500 font-bold text-gray-50 underline m-8 ">My Bucket List</h2>
        {bucketListItems}
        <Link to={"/"}>
          <button className="text-gray-50 border-green-600 border-2 px-3 py-2 m-8 ">Go to Main Page</button>
        </Link>
      </div>

    );
}