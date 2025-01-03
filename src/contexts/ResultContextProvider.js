import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://real-time-web-search.p.rapidapi.com/search';

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async () => {
    if (!searchTerm) {
      console.error('Search term is missing or empty');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}?q=${encodeURIComponent(searchTerm)}&limit=10`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '0e63808c81msh5ec38a736a4c9f5p1a3376jsne401f2217f52',
          'x-rapidapi-host': 'real-time-web-search.p.rapidapi.com',
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      setResults(data.data || []);
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
