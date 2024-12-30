import React, { createContext, useContext, useState, useCallback } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search72.p.rapidapi.com/';

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = useCallback(async (type) => {
    console.log(`Fetching results for type: ${type} and search term: ${searchTerm}`);

    if (!searchTerm) {
      console.error('Search term is empty');
      return;
    }

    setIsLoading(true);

    try {
      // Construct the URL based on type
      let url = `${baseUrl}search?q=${encodeURIComponent(searchTerm)}&num=10`;

      if (type === '/news') url += '&type=news';
      if (type === '/images') url += '&type=image';
      if (type === '/videos') url += '&type=video';

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

      // Map response data to results based on type
      if (type === '/news') {
        setResults(data.entries || []); // Adjust to match API structure
      } else if (type === '/images') {
        setResults(data.image_results || []); // Adjust to match API structure
      } else if (type === '/videos') {
        setResults(data.video_results || []); // Adjust to match API structure
      } else {
        setResults(data.results || []); // Default for web results
      }
    } catch (error) {
      console.error('Error fetching results:', error);
      setResults([]); // Clear results on error
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  return (
    <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
