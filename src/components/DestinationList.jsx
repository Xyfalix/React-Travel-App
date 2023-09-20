import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DestinationListItem from "./DestinationListItem";
import SearchCityInput from "./SearchCityInput";

const openCageApiKey = "1b20a807238f4e80b8399d73a2dbd110";
const geoApifyApiKey = "557ccea3297247b8be351939eeedea0d";

export default function DestinationList({ onUpdatePlaces }) {
    const [destinationListItems, setDestinationListItems] = useState([]);
    const [southwestLat, setSouthwestLat] = useState(null);
    const [southwestLng, setSouthwestLng] = useState(null);
    const [northeastLat, setNortheastLat] = useState(null);
    const [northeastLng, setNortheastLng] = useState(null);
    const [places, setPlaces] = useState(null);
    const { searchTerm } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [searchCity, setSearchCity] = useState(searchTerm);

    const handleSearch = (newSearchCity) => {
        setSearchCity(newSearchCity);
    }

    // fetch city cooordinates to obtain bounding box for Places API usage
  useEffect(() => {
    async function fetchCoordinates() {
      if (searchCity) {
        // Reset the following parameters everytime a new search is executed
        setIsLoading(true);
        setPlaces(null);
        setIsError(false);
        setSouthwestLat(null);
        setSouthwestLng(null);
        setNortheastLat(null);
        setNortheastLng(null);
  
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${searchCity}&key=${openCageApiKey}&limit=1`
        const response = await fetch(apiUrl);
        const responseData = await response.json();
        console.log(responseData)
        // Set coordinates if bounds is defined
        if (responseData.results.length > 0) {
          const bounds = responseData.results[0].bounds;
          console.log(bounds)
          setSouthwestLat(bounds.southwest.lat);
          setSouthwestLng(bounds.southwest.lng);
          setNortheastLat(bounds.northeast.lat);
          setNortheastLng(bounds.northeast.lng);
        // otherwise return an error to the user reflected in content
        } else {
          setIsError(true);
        }
      }
    }
  
    fetchCoordinates();
  }, [searchCity]);
  
  useEffect(() => {
    async function fetchPlaces() {
      if (southwestLng && southwestLat && northeastLng && northeastLat) {
        const placesApiUrl = `https://api.geoapify.com/v2/places?categories=tourism,natural&filter=rect:${southwestLng},${southwestLat},${northeastLng},${northeastLat}&limit=10&apiKey=${geoApifyApiKey}`;
        const placesResponse = await fetch(placesApiUrl);
        const placesResponseData = await placesResponse.json();
        console.log(placesResponseData);
        setPlaces(placesResponseData.features);
        setIsLoading(false);
      }
    }
  
    fetchPlaces();
    
  }, [southwestLng, southwestLat, northeastLng, northeastLat]);

  let content = null;

  // user has not started searching yet
  if (!searchCity) {
    content = <p className="text-gray-50 px-3 py-1">No searches executed yet</p>;
  // user keyed in an invalid destination
  } else if (isLoading && isError) {
    content = <p className="text-gray-50 px-3 py-1">You keyed in an invalid destination, please try again.</p>
  // user keyed in a valid destination and fetchPlaces is running
  } else if (isLoading) {
    content = <p className="text-gray-50 px-3 py-1">Loading your search results...</p>;
  // fetchPlaces has completed running, results displayed
  } else if (places.length > 0) {
    content = destinationListItems;
  // no features were returned from fetchPlaces
  } else {
    content = <p>Sorry, no places were found based on your search terms, please try again.</p>;
  }


    useEffect(() => {
      if (places && places.length > 0) {
        // Create an array of DestinationListItem components
        const items = places.map((place) => (
          <DestinationListItem
            key={place.properties.place_id}
            placeName={place.properties.name}
            placeId={place.properties.place_id}
          />
        ));
  
        // Update the state with the mapped items
        setDestinationListItems(items);
        
        // update searched locations in AppRouting to pass down as prop to DestinationDetails
        onUpdatePlaces(places);
      }
    }, [places]);
  
    return (
        <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center">
            <Link to={"/bucketlist"}>
                <button className="text-gray-50 border-green-600 border-2 px-3 py-1">My Bucket List</button>
            </Link>
            <h1 className="text-6xl text-black-500 font-bold text-gray-50 ">TravelEasy</h1>
            <SearchCityInput onSearch={handleSearch}/>
            <h2 className="text-2xl text-gray-50 px-3 py-1 underline">Search Results</h2>
            {content}
            
        </div>
    )
  }
  
  
  
  
  
  
  
