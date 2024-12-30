import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useResultContext } from '../contexts/ResultContextProvider';
import { Loading } from './Loading';

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      console.log('Triggering API Call...');
      getResults(); // Triggers fetch logic in ResultContextProvider
    }
  }, [searchTerm, getResults]);

  if (isLoading) return <Loading />;

  if (!results || results.length === 0) {
    return <p className="text-center mt-10 text-lg">No results found.</p>;
  }

  console.log('Results state:', results); // Debug the results structure

  return (
    <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
      {results.map((item, index) => (
        <div key={index} className="md:w-2/5 w-full">
          <a href={item.link} target="_blank" rel="noreferrer">
            <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">{item.title || 'No Title'}</p>
          </a>
          {item.snippet && (
            <p className="text-sm text-gray-500 mt-2">{item.snippet}</p>
          )}
        </div>
      ))}
    </div>
  );
};
