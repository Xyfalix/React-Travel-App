import { useEffect, useState } from 'react'
import './App.css'

const openCageApiKey = "1b20a807238f4e80b8399d73a2dbd110";
const geoApifyApiKey = "557ccea3297247b8be351939eeedea0d";

function App() {

  const [searchCity, setSearchCity] = useState('Kyoto');
  const [southwestLat, setSouthwestLat] = useState(null);
  const [southwestLng, setSouthwestLng] = useState(null);
  const [northeastLat, setNortheastLat] = useState(null);
  const [northeastLng, setNortheastLng] = useState(null);

  // fetch city cooordinates to obtain bounding box for Places API usage
  useEffect(() => {
    async function fetchCoordinates() {
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
    async function fetchPlaces() {
      if (southwestLng && southwestLat && northeastLng && northeastLat) {
        const placesApiUrl = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=rect:${southwestLng},${southwestLat},${northeastLng},${northeastLat}&limit=20&apiKey=${geoApifyApiKey}`;
        const placesResponse = await fetch(placesApiUrl);
        const placesResponseData = await placesResponse.json();

        console.log(placesResponseData);
      }
    }
    
    fetchCoordinates();
    fetchPlaces();

  }, [searchCity, southwestLng, southwestLat, northeastLng, northeastLat ]);

  
  return (
    <>
      <h1>React Travel App</h1>
    </>
  )
}

export default App
