import { useState, useEffect } from "react";
import BucketListItem from "./BucketListItem";

export default function BucketList() {
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
              country={bucketListItem.fields.country}
              city={bucketListItem.fields.city}
              name={bucketListItem.fields.name}
              address={bucketListItem.fields.address}
              contactNumber={bucketListItem.fields.contact_number}
              website={bucketListItem.fields.website}
              openingHours={bucketListItem.fields.opening_hours}
            />
          ));
            
            setBucketListItems(items);

          }
    }, [bucketListData]);

    return (
      <>
        <p>Bucket List Placeholder</p>
        {bucketListItems}
      </>

    );
}