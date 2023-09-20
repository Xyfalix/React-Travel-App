import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchCityInput ( { onSearch }) {
    const navigate = useNavigate();
    const [searchCityInputValue, setSearchCityInputValue] = useState('')

    const handleInputChange = (event) => {
        setSearchCityInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchCityInputValue);
        navigate(`/search/${searchCityInputValue}`)
    }

    return (
        <>
          <form onSubmit={handleSubmit}>
            <input
                className="my-5 mx-2 border-solid border-green-600 border-4 px-3 py-1"
                type="text"
                placeholder="Type name of city here"
                value={searchCityInputValue}
                onChange={handleInputChange}
             />
            <button className="border-solid border-green-600 border-2 text-gray-50 px-3 py-1" type="submit">Search</button>
          </form>
        </>
    )
}