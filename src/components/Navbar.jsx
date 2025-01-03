import React from 'react';

export const Navbar = ({ darkTheme, setDarkTheme }) => (
  <div className="p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-200">
    <p className="text-2xl bg-blue-500 font-bold text-white py-1 px-2 rounded dark:bg-gray-500 dark:text-gray-900">
      Tezeract 🔎
    </p>
    <button
      type="button"
      onClick={() => setDarkTheme(!darkTheme)}
      className="text-xl dark:bg-gray-50 dark:text-gray-900 bg-white border rounded-full px-2 py-1 hover:shadow-lg"
    >
      {darkTheme ? '🌙 Dark' : '☀️ Light'}
    </button>
  </div>
);
