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

// Matomo-seurantakomponentti
const MatomoTracker = () => {
  const location = useLocation(); // Hakee nykyisen sijainnin

  useEffect(() => {
    var _paq = window._paq || [];

    // Matomo-seurantakoodin asetukset
    _paq.push(["setTrackerUrl", "//tutkibudjettia2025.fi/matomo/matomo.php"]);
    _paq.push(["setSiteId", "1"]); // Sivuston ID Matomossa
    _paq.push(["setAnonymizeIp", 1]); // IP-anonymisointi
    _paq.push(["disableCookies"]); // Poista evästeet käytöstä

    // Seurannan aloitus ja linkkien seuraaminen
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);

    // Matomo-seurantaskriptin lataaminen
    (function () {
      var u = "//tutkibudjettia2025.fi/matomo/"; // Matomon URL
      var d = document,
        g = d.createElement("script"),
        s = d.getElementsByTagName("script")[0];
      g.async = true;
      g.src = u + "matomo.js";
      s.parentNode.insertBefore(g, s);
    })();

    // Lähetetään page view, joka sisältää myös URL-osoitteen ja query-parametrit
    _paq.push(["trackPageView", location.pathname + location.search]);
  }, [location]); // Seuraa reitityksen muutoksia

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
