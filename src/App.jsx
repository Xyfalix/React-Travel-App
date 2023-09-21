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
    <div className="bg-slate-900 min-h-screen grid grid-cols-2 grid-rows-[50px_1fr]">
      <div className="flex items-center justify-end content-start row-start-1 row-end-2 col-start-2 col-end-2">
        <Link to={"/bucketlist"}>
          <button className="text-gray-50 border-green-600 border-2 px-3 py-1 m-3">My Bucket List</button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center col-span-2 row-start-2 row-end-3 pb-20">
        <h1 className="text-6xl text-black-500 font-bold text-gray-50 text-center">TravelEasy</h1>
        <SearchCityInput onSearch={handleSearch}/>
      </div>
    </div>
  )
}
