import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarChart2 from './BarChart2';
import Feedback from './Feedback';
import Footer from './Footer';
import Verokuitti from './Verokuitti';
import Header from './Header';
import Etusivu from './Etusivu';





const App = () => {
    return (
       
            <>
                <Router>
        <Header />
       
      <Routes>
       
        <Route path="/" element={<Etusivu />} />
        <Route path="/budjetti" element={<BarChart2 />} />
        <Route path="/palaute" element={<Feedback />} />
        <Route path="/verokuitti" element={<Verokuitti />} />
      </Routes>
        <Footer />
    </Router>
            </>
           
    );
};

export default App;
