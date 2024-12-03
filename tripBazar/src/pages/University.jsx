import React, { useState } from 'react';

const University = () => {
    const [country, setCountry] = useState('');
    const [universities, setUniversities] = useState([]);
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);
    const[search, setSearch] = useState(false);

    const handleSearch = async () => {
        setLoader(true);
        setSearch(true);
        if (!country) {
            setLoader(false);
            setError('Please provide search field.');
            return;
        }
        setError('');
        const query = new URLSearchParams();
        if (country) query.append('country', country);
        console.log(query);

        try {
            const response = await fetch(`http://universities.hipolabs.com/search?${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch universities');
            }
            const data = await response.json();
            setUniversities(data);
        } catch (err) {
            setError('Error fetching data. Please try again.');
        }
        setLoader(false)
    };

    return (
        <div className="App">
            <h1>University Search</h1>
            <div className="search-form">

                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {error && <p className="error">{error}</p>}
            {!loader ? <div className="results">
                {universities.length>0 ? universities.map((university, index) => (
                    <div key={index} className="card">
                        <h3>{university.name}</h3>
                        <p><strong>Country:</strong> {university.country}</p>
                        {university['state-province'] && (
                            <p><strong>State/Province:</strong> {university['state-province']}</p>
                        )}
                        <a href={university.web_pages[0]} target="_blank">
                            Visit Website
                        </a>
                    </div>
                )): search && !error && <h2>No data found</h2>}
            </div>: <h2>Loading...</h2>}
            
        </div>
    );
};

export default University;
