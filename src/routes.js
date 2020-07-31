import {BrowserRouter, Route} from 'react-router-dom'
import React from 'react';

import Home from './pages/HomePage/Home';
import NNW from './pages/NNWPage/NNW';


const routes = ()=> {

return(

  <BrowserRouter>
    <div>
      <Route exact path="/" component={NNW} />
      <Route exact path="/nnw" component={NNW} />
    </div>
  </BrowserRouter>

)
  
}

export default routes;