import { useState } from 'react'
import { Link } from 'react-router-dom';
import './App.css'
import SearchCityInput from './components/SearchCityInput';


export default function App() {
  const [searchCity, setSearchCity] = useState(null);

  const handleSearch = (newSearchCity) => {
    setSearchCity(newSearchCity);
  }
  
  return (
    <>
      <h1>TravelEasy</h1>
      <SearchCityInput onSearch={handleSearch}/>
      <Link to={"/bucketlist"}>
        <button>View Bucket List</button>
      </Link>
    </>
    
  )
}
