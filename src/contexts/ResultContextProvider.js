import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search72.p.rapidapi.com/';

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Search term in context updated to:', searchTerm);
  }, [searchTerm]);

  const getResults = async (type) => {
  console.log('Current Search Term in Context:', searchTerm);

  if (!searchTerm || searchTerm.trim() === '') {
    console.error('Search term is missing or empty');
    return;
  }

  setIsLoading(true);

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

    if (type === 'news') {
      setResults(data.entries || []);
    } else if (type === 'images') {
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
