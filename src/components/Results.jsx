import React, { useEffect } from 'react';
import { useResultContext } from '../contexts/ResultContextProvider';
import { Loading } from './Loading';

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();

  useEffect(() => {
    if (searchTerm) {
      getResults();
    }
  }, [searchTerm]);

  if (isLoading) return <Loading />;

  if (!results || results.length === 0) {
    return <p className="text-center">No results found</p>;
  }

  return (
    <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
      {results.map(({ title, url, snippet, domain }, index) => (
        <div key={index} className="md:w-2/5 w-full">
          <a href={url} target="_blank" rel="noreferrer">
            <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">{title}</p>
          </a>
          <p className="text-sm">{snippet}</p>
          <p className="text-xs text-gray-500">{domain}</p>
        </div>
      ))}
    </div>
  );
};
