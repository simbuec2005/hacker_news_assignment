import React from 'react';
import NewsGrid from './components/NewsGrid';
import { withRouter } from 'react-router-dom'

function App({history}) {
  return (
    <div>
      <NewsGrid history={history}/>
    </div>
  );
}

export default withRouter(App);
