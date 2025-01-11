import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BarChart2 from "./pages/BarChart2";
import Feedback from "./Feedback";
import Footer from "./Footer";
import Verokuitti from "./Verokuitti";
import Header from "./Header";
import Etusivu from "./pages/Etusivu";
import Login from "./pages/Login";
import Budjetti from "./pages/Budjetti";

const App = () => {
  useEffect(() => {
    // Ladataan Matomo Tag Managerin skripti
    var _mtm = (window._mtm = window._mtm || []);
    _mtm.push({ "mtm.startTime": new Date().getTime(), event: "mtm.Start" });

    var d = document,
      g = d.createElement("script"),
      s = d.getElementsByTagName("script")[0];
    g.async = true;
    g.src = "https://tutkibudjettia2025.fi/matomo/"; // Korvaa oikealla URL:llä
    s.parentNode.insertBefore(g, s);

    // Matomo-seurannan asetukset
    if (window._mtm) {
      window._mtm.push(["disableCookies"]); // Estää evästeet
      window._mtm.push(["setAnonymizeIp", 1]); // Anonymisoi IP
      window._mtm.push(["setCustomUrl", window.location.href]); // Asetetaan URL
      window._mtm.push(["setCustomTitle", document.title]); // Asetetaan sivun otsikko
      window._mtm.push(["trackPageView"]); // Lähetä sivunäkymä
    }
  }, []); // Suoritetaan vain kerran komponentin alussa

  return (
    <>
      <Router>
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
