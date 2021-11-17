import React from 'react';
import {Router,Routes,Route} from 'react-router-dom';
import LandingPage from './LandingPage';
import Update from './Update';
const App=()=> {
  return (
   <div>
     <Router>
       <Routes>
         <Route path="/" element={<LandingPage/>}/>
         <Route path="/update" element={<Update/>}/>
       </Routes>
     </Router>
    </div>
  );
}

export default App;