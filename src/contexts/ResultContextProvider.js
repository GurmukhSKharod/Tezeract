import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search72.p.rapidapi.com/';

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('Software Development');

  const getResults = async (type, searchTerm) => {

    console.log('Search Term:', searchTerm);
    
    if (!searchTerm || searchTerm.trim() === '') {
      console.error('Search term is missing or empty');
      return;
    }

    console.log('Search Term:', searchTerm);
    
    setIsLoading(true);

    let url = `${baseUrl}search?q=${encodeURIComponent(searchTerm)}&lr=en-US&num=10`; // Default for web search
    
    // Adjust the endpoint or query parameters for specific types
    if (type === 'news') {
      url += '&type=news'; // Adjust according to API documentation for news
    } else if (type === 'images') {
      url += '&type=image'; // Adjust according to API documentation for images
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
      setResults([]); // Clear results on error
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
