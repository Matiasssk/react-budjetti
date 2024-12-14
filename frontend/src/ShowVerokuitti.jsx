import * as d3 from "d3";

import { useEffect, useRef, useState } from "react";
import "./fonts.css";
import "./showVerokuitti.css";

function formatValue(value) {
  return value.toLocaleString("fi-FI", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
}

const ShowVerokuitti = ({ summa }) => {
  const [vero, setVero] = useState("");

  const itemsRef = useRef([]);

  const chartRef = useRef(null);
  const handleRefresh = () => {
    window.location.reload();
  };
  const laskeVero = (tulot) => {
    const monthlyIncome = parseFloat(tulot);
    const annualIncome = monthlyIncome * 12;
    let tax = 0;

    if (annualIncome <= 21200) {
      tax = annualIncome * 0.1264;
    } else if (annualIncome <= 31500) {
      tax = 2679.68 + (annualIncome - 21200) * 0.19;
    } else if (annualIncome <= 52100) {
      tax = 4636.68 + (annualIncome - 31500) * 0.3025;
    } else if (annualIncome <= 88200) {
      tax = 10868.18 + (annualIncome - 52100) * 0.34;
    } else if (annualIncome <= 150000) {
      tax = 23142.18 + (annualIncome - 88200) * 0.4175;
    } else {
      tax = 48943.68 + (annualIncome - 150000) * 0.4425;
    }
    const formatoitu = formatValue(tax);
    console.log(formatoitu);
    setVero(`Verosi yhteensä: ${formatoitu}€ / vuosi`);
    return tax;
  };

  useEffect(() => {
    const taxValue = laskeVero(summa);

    d3.json("uusiMenot.json").then((data) => {
      const root = d3
        .hierarchy(data)
        .sum((d) => d.size)
        .sort((a, b) => b.value - a.value);

      root.each((node) => {
        if (node.children) {
          node.children = node.children.filter((child) => child.value > 0);
        }
      });

      const totalValue = root.value;
      initializeChart(root, totalValue, taxValue);
    });

    return () => {
      d3.select(chartRef.current).selectAll("*").remove();
    };
  }, []);

  function initializeChart(root, totalValue, taxValue) {
    const container = d3.select(chartRef.current);

    const nodes = container
      .selectAll(".node-wrapper")
      .data(root.children[0].children || [])
      .enter()
      .append("div")
      .attr("class", "node-wrapper");

    const mainLukuWrapper = nodes
      .append("div")
      .attr("class", "main-luku-wrapper");

    mainLukuWrapper

      .append("div")
      .attr("class", "nodea")
      .text((d) => {
        const prosentti = (d.value / totalValue) * 100;
        const euroSumma = (prosentti / 100) * taxValue;
        let nimi = d.data.name.split(" ");
        nimi = nimi.filter((e) => e !== "HALLINNONALA");
        nimi = nimi.join(" ");
        if (nimi.toLowerCase().slice(-1) === "n") {
          nimi = nimi.slice(0, -1);
        }
        const formatoitu = formatValue(euroSumma);
        return `${nimi.toLowerCase()}: ${formatoitu}€`;
      });

    mainLukuWrapper
      .append("div")
      .attr("class", "nuoli")
      .attr("id", (d, i) => `${i}`)
      .attr("width", 24)
      .attr("height", 24)

      .on("click", (event, d) => {
        const prosentti = (d.value / totalValue) * 100;
        const euroSumma = (prosentti / 100) * taxValue;
        const id = event.currentTarget.id;

        if (itemsRef.current[id]) {
          const tila = true;
          itemsRef.current[id] = false;
          d3.select(event.currentTarget).classed("active", false);
          update(d, taxValue, event, tila, euroSumma);
        } else {
          const tila = false;
          itemsRef.current[id] = true;
          d3.select(event.currentTarget).classed("active", true);
          update(d, taxValue, event, tila, euroSumma);
        }
      });
  }

  function update(node, taxValue, event, tila, euroSumma) {
    console.log("event", node);

    const targetElement = event.currentTarget;
    const nodeWrapperElement = targetElement.closest(".node-wrapper"); // Valitaan oikea elementti
    console.log("nodewrapper", nodeWrapperElement);
    if (tila) {
      d3.select(nodeWrapperElement).selectAll(".osasto-menot").remove();
      return;
    }

    const container = d3.select(nodeWrapperElement);
    const wrapper = container.selectAll(".osasto-menot").data([node]);
    console.log(container.node());
    wrapper.exit().remove();

    const enterWrapper = wrapper
      .enter()
      .append("div")
      .attr("class", "osasto-menot");

    const nodes = enterWrapper
      .merge(wrapper)
      .selectAll(".nodeb")
      .data(node.children || [], (d) => d.data.name);

    nodes.exit().remove();

    const enterNodes = nodes
      .enter()
      .append("div")
      .attr("class", "nodeb")
      .text((d) => {
        const prosentti = (d.value / node.value) * 100;
        const osastoSumma = (prosentti / 100) * euroSumma;
        const formatoitu = formatValue(osastoSumma);
        return `${d.data.name.toLowerCase()}: ${formatoitu}€`;
      });

    enterNodes.merge(nodes);
  }

  return (
    <div className="kuitti-sivu">
      <div className="kuitti">
        <div className="glass-kuitti">
          <div className="teksti-flex">
            <div className="kuitti-teksti">
              <h3>Suomen Valtio</h3>
              <p>Snellmaninkatu 1A, Helsinki</p>
              <p>Puh. 02 00001</p>
              <p>Y-tunnus: 01237-9</p>
            </div>
          </div>
          <div ref={chartRef} id="chart"></div>
          <div id="verosumma">{vero}</div>
          <div className="kiitos">
            Kiitos Käynnistä!{" "}
            <button className="refresh-btn" onClick={handleRefresh}>
              Tervetuloa uudelleen!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowVerokuitti;
