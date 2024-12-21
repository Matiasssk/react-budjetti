import { useEffect, useState } from "react";
import * as d3 from "d3";
import Treemap from "./Treemap";

const TreemapContainer = ({ handleBarClick, handleMapClick }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (data !== null) return;
    d3.json("eduskunnan_kirjelma_muunnettu.json")
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Datan haku D3.js:llä epäonnistui:", error);
        setLoading(false);
      });
  }, [data]);

  if (loading) return <div>Ladataan...</div>;
  if (!data) return <div>Dataa ei voitu ladata!</div>;

  return (
    <div>
      <Treemap
        data={data}
        handleBarClick={handleBarClick}
        handleMapClick={handleMapClick}
      />
    </div>
  );
};

export default TreemapContainer;
