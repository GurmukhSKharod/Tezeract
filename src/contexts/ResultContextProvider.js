import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search72.p.rapidapi.com/';

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async (type) => {
    if (!searchTerm) {
      console.error('Search term is missing or empty');
      return;
    }

    setIsLoading(true);

    try {
      const url = `${baseUrl}search?q=${encodeURIComponent(searchTerm)}&num=10`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '0e63808c81msh5ec38a736a4c9f5p1a3376jsne401f2217f52',
          'x-rapidapi-host': 'google-search72.p.rapidapi.com',
        },
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (type === '/news') {
        setResults(data.entries || []);
      } else if (type === '/images') {
        setResults(data.image_results || []);
      } else {
        setResults(data.results || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
