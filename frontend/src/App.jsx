import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import BarChart2 from "./pages/BarChart2";
import Feedback from "./Feedback";
import Footer from "./Footer";
import Verokuitti from "./Verokuitti";
import Header from "./Header";
import Etusivu from "./pages/Etusivu";
import Login from "./pages/Login";
import Budjetti from "./pages/Budjetti";

const MatomoTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Lisää Matomo-seurantakoodi
    var _paq = (window._paq = window._paq || []);
    _paq.push(["setAnonymizeIp", 1]);
    _paq.push(["disableCookies"]);
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);

    (function () {
      var u = "//tutkibudjettia2025.fi/matomo/";
      _paq.push(["setTrackerUrl", u + "matomo.php"]);
      _paq.push(["setSiteId", "1"]);
      var d = document,
        g = d.createElement("script"),
        s = d.getElementsByTagName("script")[0];
      g.async = true;
      g.src = u + "matomo.js";
      s.parentNode.insertBefore(g, s);
    })();
  }, [location]); // Tämä varmistaa, että seuranta päivittyy reittimuutoksissa

  return null;
};

const App = () => {
  return (
    <>
      <Router>
        <MatomoTracker />
        <Header />

        <Routes>
          <Route exact path="/" element={<Etusivu />} />
          <Route path="/budjetti" element={<Budjetti />} />
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
