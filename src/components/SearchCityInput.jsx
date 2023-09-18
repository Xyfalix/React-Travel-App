import { useState } from "react";

export default function SearchCityInput ( { onSearch }) {
    const [searchCityInputValue, setSearchCityInputValue] = useState('')

    const handleInputChange = (event) => {
        setSearchCityInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchCityInputValue);
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