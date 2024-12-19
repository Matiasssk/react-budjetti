import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import "../index.css";

import TreemapContainer from "../TreemapContainer";
import Barchart2 from "./BarChart2";

const Budjetti = () => {
  const ref = useRef(null);
  const [ruudukko, setRuudukko] = useState(false); // Vaihtoehdon hallinta

  const handleBarClick = () => {
    setRuudukko(true);
  };
  const handleMapClick = () => {
    setRuudukko(false);
  };

  return (
    <>
      <div className="svg-wrapper">
        {ruudukko ? (
          <Barchart2
            handleBarClick={handleBarClick}
            handleMapClick={handleMapClick}
          />
        ) : (
          <TreemapContainer
            handleBarClick={handleBarClick}
            handleMapClick={handleMapClick}
          />
        )}
      </div>
    </>
  );
};

export default Budjetti;
