import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import SearchCityInput from './components/SearchCityInput';
import DestinationList from './components/DestinationList';
import DestinationDetail from './components/DestinationDetail';

const openCageApiKey = "1b20a807238f4e80b8399d73a2dbd110";
const geoApifyApiKey = "557ccea3297247b8be351939eeedea0d";

function App() {
  const [searchCity, setSearchCity] = useState(null);
  const [southwestLat, setSouthwestLat] = useState(null);
  const [southwestLng, setSouthwestLng] = useState(null);
  const [northeastLat, setNortheastLat] = useState(null);
  const [northeastLng, setNortheastLng] = useState(null);
  const [places, setPlaces] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
        const placesApiUrl = `https://api.geoapify.com/v2/places?categories=tourism,natural&filter=rect:${southwestLng},${southwestLat},${northeastLng},${northeastLat}&limit=20&apiKey=${geoApifyApiKey}`;
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
    content = <p>No searches executed yet</p>;
  // user keyed in an invalid destination
  } else if (isLoading && isError) {
    content = <p>You keyed in an invalid destination, please try again.</p>
  // user keyed in a valid destination and fetchPlaces is running
  } else if (isLoading) {
    content = <p>Loading your search results...</p>;
  // fetchPlaces has completed running, results displayed
  } else if (places.length > 0) {
    content = <DestinationList places={places} />;
  // no features were returned from fetchPlaces
  } else {
    content = <p>Sorry, no places were found based on your search terms, please try again.</p>;
  }

  return (
    <>
      <h1>TravelEasy</h1>
      <SearchCityInput onSearch={handleSearch}/>
      <button>View Bucket List</button>
      <h2>Search Results</h2>
      {content}
      <Routes>
        <Route exact path="/destination/:id" element={<DestinationDetail />} />
        <Route exact path={`/search/:searchTerm`} element={<DestinationList places={places} /> } />
      </Routes>
    </>
  )
}

export default App
