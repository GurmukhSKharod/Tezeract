import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Results } from './Results';

export const Routesp = () => (
  <div className="p-4">
    <Navigate from="/" to="/search" />
    <Routes>
      <Route path="/search" element={<Results />} />
    </Routes>
  </div>
);
