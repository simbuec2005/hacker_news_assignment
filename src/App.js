import React from 'react';
import NewsGrid from './components/NewsGrid';
import { withRouter } from 'react-router-dom'

function App() {
  return (
    <div className="appContainer">
      <NewsGrid />
    </div>
  );
}

export default App;
