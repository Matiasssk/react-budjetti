import { useState } from "react";
import "./pickyear.css";
const PickYear = ({ handleYearChange }) => {
  const [selectedYear, setSelectedYear] = useState("2025"); // Tilamuuttuja valitulle vuodelle

  // Käsittele valinnan muuttuminen
  //const handleYearChange = (event) => {
  // setSelectedYear(event.target.value); // Päivitä valittu vuosi
  // console.log("Valittu vuosi:", event.target.value); // Näytä valittu vuosi konsolissa
  //};
  const handleSelectChange = (event) => {
    const year = event.target.value; // Uusi valittu vuosi
    setSelectedYear(year); // Päivitä tila
    handleYearChange(year); // Lähetä vuosi parent-komponentille
  };
  return (
    <select
      name="years"
      id="year-select"
      value={selectedYear} // Liitä valinta tilaan
      onChange={handleSelectChange} // Käsittele muutokset
    >
      <option value="2026">2026</option>
      <option value="2025">2025</option>
      <option value="2024">2024</option>
      <option value="2023">2023</option>
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
    </select>
  );
};

export default PickYear;
