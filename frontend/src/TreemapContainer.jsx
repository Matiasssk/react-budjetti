import { useEffect, useState } from "react";
import * as d3 from "d3";
import Treemap from "./Treemap";
import PickYear from "./components/PickYear";

const TreemapContainer = ({ handleBarClick, handleMapClick }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2025); // Tilamuuttuja valitulle vuodelle

  // Käsittele valinnan muuttuminen
  const handleYearChange = (year) => {
    setSelectedYear(year); // Päivitä valittu vuosi
    console.log("Valittu vuosi:", year); // Näytä valittu vuosi konsolissa
  };
  console.log(selectedYear);
  useEffect(() => {
    if (!selectedYear) return;
    console.log(loading);
    //if (data !== null) return;

    const year = selectedYear;
    const fileName = `budjetti_${year}.json`;
    console.log("file", fileName);

    d3.json(fileName)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Datan haku D3.js:llä epäonnistui:", error);
        setLoading(false);
      });
  }, [selectedYear]);

  if (loading) return <div>Ladataan...</div>;
  if (!data) return <div>Dataa ei voitu ladata!</div>;

  return (
    <div>
      <Treemap
        data={data}
        handleBarClick={handleBarClick}
        handleMapClick={handleMapClick}
        handleYearChange={handleYearChange}
      />
    </div>
  );
};

export default TreemapContainer;
