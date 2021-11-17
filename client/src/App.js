import React from 'react';
import {Router,Routes,Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Update from './components/update';
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