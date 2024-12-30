import React, { useEffect } from 'react';
import { useResultContext } from '../contexts/ResultContextProvider';

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();

  useEffect(() => {
    if (searchTerm) {
      console.log('Triggering API Call...');
      getResults();
    }
  }, [searchTerm]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!results || results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div>
      <h2>Results:</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{JSON.stringify(result)}</li>
        ))}
      </ul>
    </div>
  );
};
