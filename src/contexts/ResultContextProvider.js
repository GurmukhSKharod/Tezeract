import React, { createContext, useContext, useState, useCallback } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search72.p.rapidapi.com/';

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Memoized function to avoid re-creating `getResults` every render
  const getResults = useCallback(async (type) => {
    if (!searchTerm) {
      console.error('Search term is missing or empty');
      return;
    }

    setIsLoading(true);

    try {
      let url = `${baseUrl}search?q=${encodeURIComponent(searchTerm)}&num=10`;

      // Adjust endpoint for specific result types
      if (type === '/news') {
        url += '&type=news';
      } else if (type === '/images') {
        url += '&type=image';
      } else if (type === '/videos') {
        url += '&type=video';
      }

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

      // Debug API response structure
      console.log('API Response:', data);

      // Update results based on response structure
      if (type === '/news') {
        setResults(data.entries || []);
      } else if (type === '/images') {
        setResults(data.image_results || []);
      } else if (type === '/videos') {
        setResults(data.video_results || []);
      } else {
        setResults(data.results || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]); // Clear results on error
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  return (
    <ResultContext.Provider
      value={{
        getResults,
        results,
        searchTerm,
        setSearchTerm,
        isLoading,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
