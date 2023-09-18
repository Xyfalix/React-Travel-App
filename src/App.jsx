import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import SearchCityInput from './components/SearchCityInput';
import DestinationList from './components/DestinationList';
import DestinationDetail from './components/DestinationDetail';

const openCageApiKey = "1b20a807238f4e80b8399d73a2dbd110";
const geoApifyApiKey = "557ccea3297247b8be351939eeedea0d";
// const tripAdvisorApiKey = "38755A2409AF48AABDC633542654CBA4";
// const googleMapsApiKey = "AIzaSyBdAsdNj2pYQ2wgY-lmctGfeq8hHYxpVQ4"

function App() {

  const [searchCity, setSearchCity] = useState(null);
  const [southwestLat, setSouthwestLat] = useState(null);
  const [southwestLng, setSouthwestLng] = useState(null);
  const [northeastLat, setNortheastLat] = useState(null);
  const [northeastLng, setNortheastLng] = useState(null);
  const [places, setPlaces] = useState(null);

  const handleSearch = (newSearchCity) => {
    setSearchCity(newSearchCity);
  }

  // fetch city cooordinates to obtain bounding box for Places API usage
  useEffect(() => {
    async function fetchCoordinates() {
      if (searchCity) {
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${searchCity}&key=${openCageApiKey}&limit=1`
        const response = await fetch(apiUrl);
        const responseData = await response.json();
        const bounds = responseData.results[0].bounds;
        console.log(bounds)
        setSouthwestLat(bounds.southwest.lat);
        setSouthwestLng(bounds.southwest.lng);
        setNortheastLat(bounds.northeast.lat);
        setNortheastLng(bounds.northeast.lng);

        console.log(`SouthWest Lat: ${southwestLat}, SouthWest Lng: ${southwestLng}, NorthEast Lat: ${northeastLat}, NorthEast Lng: ${northeastLng}`)
      }
    }
    async function fetchPlaces() {
      if (southwestLng && southwestLat && northeastLng && northeastLat) {
        const placesApiUrl = `https://api.geoapify.com/v2/places?categories=tourism,natural&filter=rect:${southwestLng},${southwestLat},${northeastLng},${northeastLat}&limit=20&apiKey=${geoApifyApiKey}`;
        const placesResponse = await fetch(placesApiUrl);
        const placesResponseData = await placesResponse.json();
        console.log(placesResponseData);
        setPlaces(placesResponseData.features);
      }
    }
    
    fetchCoordinates();
    fetchPlaces();

  }, [searchCity, southwestLng, southwestLat, northeastLng, northeastLat,]);

  return (
    <>
      <h1>React Travel App</h1>
      <SearchCityInput onSearch={handleSearch}/>
      <button>View Bucket List</button>
      <h2>Search Results</h2>
      {places ? (
        <DestinationList places={places} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default App
