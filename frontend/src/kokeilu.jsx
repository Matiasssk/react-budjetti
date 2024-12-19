import React from "react";
import TreeMap from "react-d3-treemap";
import "react-d3-treemap/dist/react.d3.treemap.css";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Hakee data.json tiedoston public-kansiosta
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log("Virhe tiedoston latauksessa", error));
  }, []);
  return (
    <div className="App">
      {data && <TreeMap id="myTreeMap" height={500} width={800} data={data} />}
    </div>
  );
}
