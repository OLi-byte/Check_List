import React from 'react';
import Home from './Pages/Home/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Info from './Pages/Info/Info';

const App = () => {
  return ( 
    <Router>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/:id' element={<Info />} /> 
      </Routes>
    </Router>     
   );
}
 
export default App;
