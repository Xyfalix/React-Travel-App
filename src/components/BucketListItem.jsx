import { Link } from "react-router-dom";

export default function BucketListItem ({ name, country, city, id, visited }) {

    return (
        <>
          <Link to={`/bucketlist/${id}`}>
            <div className={`shadow-md rounded-md p-2 m-2 w-96 h-24 flex flex-col items-center justify-center transition duration-300 ease-in-out transform text-center ${
            visited ? "bg-green-700 text-white hover:bg-blue-900 hover:text-white" : "bg-white text-black hover:bg-red-900 hover:text-white" 
          }`}>
              <h2 className="text-xl font-semibold mb-2 text-center">{name}</h2>
              <p className="text-center">{country}, {city}</p>
            </div>
          </Link>
        </>
    )
}