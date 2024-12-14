import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarChart2 from "./BarChart2";
import Feedback from "./Feedback";
import Footer from "./Footer";
import Verokuitti from "./Verokuitti";
import Header from "./Header";
import Etusivu from "./Etusivu";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route exact path="/" element={<Etusivu />} />
          <Route path="/budjetti" element={<BarChart2 />} />
          <Route path="/palaute" element={<Feedback />} />
          <Route path="/verokuitti" element={<Verokuitti />} />
          <Route path="/kirjaudusivulle" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
