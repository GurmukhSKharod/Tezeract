import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../contexts/ResultContextProvider';
import { Loading } from './Loading';

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();
  const [lastRequest, setLastRequest] = useState({ term: '', path: '' });

  useEffect(() => {
    // Prevent redundant API calls
    if (
      searchTerm &&
      (searchTerm !== lastRequest.term || location.pathname !== lastRequest.path)
    ) {
      setLastRequest({ term: searchTerm, path: location.pathname });

      let type = '/search';
      if (location.pathname === '/news') type = '/news';
      if (location.pathname === '/images') type = '/images';
      if (location.pathname === '/videos') type = '/videos';

      getResults(type);
    }
  }, [searchTerm, location.pathname, lastRequest, getResults]);

  if (isLoading) return <Loading />;

  console.log('Results:', results);

  if (!results || results.length === 0) {
    return <p className="text-center mt-10 text-lg">No results found</p>;
  }

  switch (location.pathname) {
    case '/search':
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results.map(({ link, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link?.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">{title}</p>
              </a>
            </div>
          ))}
        </div>
      );
    case '/images':
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results.map(({ image, link }, index) => (
            <a href={link?.href} target="_blank" rel="noreferrer" className="sm:p-3 p-5" key={index}>
              <img src={image?.src} alt={link?.title} loading="lazy" />
              <p className="sm:w-36 w-36 break-words text-sm mt-2">{link?.title}</p>
            </a>
          ))}
        </div>
      );
    case '/news':
      return (
        <div className="sm:px-56 flex flex-wrap justify-between items-center space-y-6">
          {results.map(({ id, links, source, title }) => (
            <div key={id} className="md:w-2/5 w-full">
              <a href={links?.[0]?.href} target="_blank" rel="noreferrer" className="hover:underline">
                <p className="text-lg dark:text-blue-300 text-blue-700">{title}</p>
              </a>
              <div className="flex gap-4">
                <a href={source?.href} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-300">
                  {source?.href}
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    case '/videos':
      return (
        <div className="flex flex-wrap">
          {results.map((video, index) => (
            <div key={index} className="p-2">
              {video?.additional_links?.[0]?.href && (
                <ReactPlayer
                  url={video.additional_links[0].href}
                  controls
                  width="355px"
                  height="200px"
                />
              )}
            </div>
          ))}
        </div>
      );
    default:
      return <p>Error...</p>;
  }
};
