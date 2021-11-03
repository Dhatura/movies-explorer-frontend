import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Header from '../Header/Header';

function App() {
  return (
    <div className="root">
      <div className="root__container">
        <Header />
      </div>
    </div>
  );
}

export default App;
