import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search72.p.rapidapi.com/';

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const getResults = async (type, searchTerm) => {

    console.log('Search Term:', searchTerm);
    
    if (!searchTerm || searchTerm.trim() === '') {
      console.error('Search term is missing or empty');
      return;
    }

    console.log('Search Term:', searchTerm);
    
    setIsLoading(true);
    setError(null);

    let url = `${baseUrl}search?q=${encodeURIComponent(searchTerm)}&lr=en-US&num=10`;

    if (type === 'news') {
      url = `${baseUrl}news/search?q=${encodeURIComponent(searchTerm)}&lr=en-US&num=10`;
    } else if (type === 'images') {
      url = `${baseUrl}image/search?q=${encodeURIComponent(searchTerm)}&lr=en-US&num=10`;
    }
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '0e63808c81msh5ec38a736a4c9f5p1a3376jsne401f2217f52',
          'x-rapidapi-host': 'google-search72.p.rapidapi.com',
        },
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API Response:', data);
  
      // Update the results based on the type of data returned
      if (type === 'news') {
        setResults(data.entries || []); // Assuming 'entries' contains news results
      } else if (type === 'images') {
        setResults(data.image_results || []); // Assuming 'image_results' contains image results
      } else {
        setResults(data.results || []); // Default web results
      }
    } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch results. Please try again.');
        setResults([]);
    } finally {
      setIsLoading(false);
    }
};


  return (
    <ResultContext.Provider
        value={{
          getResults,
          results,
          searchTerm,
          setSearchTerm: (term) => {
            console.log('Setting search term in context:', term);
            setSearchTerm(term);
          },
          isLoading,
          error,
        }}
      >
        {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
