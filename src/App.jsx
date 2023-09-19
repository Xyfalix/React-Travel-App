import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import SearchCityInput from './components/SearchCityInput';


function App() {
  const [searchCity, setSearchCity] = useState(null);

  const handleSearch = (newSearchCity) => {
    setSearchCity(newSearchCity);
  }
  
  return (
    <>
      <h1>TravelEasy</h1>
      <SearchCityInput onSearch={handleSearch}/>
      <button>View Bucket List</button>
    </>
    
  )
}

export default App
