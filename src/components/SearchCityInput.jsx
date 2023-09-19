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
                type="text"
                placeholder="Type name of city here"
                value={searchCityInputValue}
                onChange={handleInputChange}
             />
            <button type="submit">Search</button>
          </form>
        </>
    )
}