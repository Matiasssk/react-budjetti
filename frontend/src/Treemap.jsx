import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./Mapincss.css";
import PickYear from "./components/PickYear";
import "./index.css";

function formatValue(value) {
  let val = value;
  let count = 0;
  if (value > 1e9) {
    val = value / 1e9;
    count = 1;
  } else {
    val = value / 1e6;
  }
  val = val.toLocaleString("fi-FI", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return [val, count];
}

/*
const color = d3
  .scaleOrdinal()
  .domain([
    "VALTIOVARAINMINISTERIÖN HALLINNONALA",
    "SOSIAALI- JA TERVEYSMINISTERIÖN HALLINNONALA",
    "OPETUS- JA KULTTUURIMINISTERIÖN HALLINNONALA",
    "PUOLUSTUSMINISTERIÖN HALLINNONALA",
    "TYÖ- JA ELINKEINOMINISTERIÖN HALLINNONALA",
    "LIIKENNE- JA VIESTINTÄMINISTERIÖN HALLINNONALA",
    "MAA- JA METSÄTALOUSMINISTERIÖN HALLINNONALA",
    "VALTIONVELAN KOROT",
    "SISÄMINISTERIÖN HALLINNONALA",
    "ULKOMINISTERIÖN HALLINNONALA",
    "OIKEUSMINISTERIÖN HALLINNONALA",
    "YMPÄRISTÖMINISTERIÖN HALLINNONALA",
    "VALTIONEUVOSTON KANSLIA",
    "EDUSKUNTA",
    "TASAVALLAN PRESIDENTTI",
    "VEROT JA VERONLUONTEISET TULOT",
    "LAINAT",
    "SEKALAISET TULOT",
    "KORKOTULOT, OSAKKEIDEN MYYNTITULOT JA VOITON TULOUTUKSET",
    "Menot",
    "Tulot",
  ])
  .range([
    "rgb(60, 90, 153)", // Sininen, pehmeämpi
    "rgb(95, 45, 130)", // Tumma violetti
    "rgb(60, 110, 80)", // Metsänvihreä
    "rgb(50, 85, 105)", // Tumma petrooli
    "rgb(85, 55, 145)", // Syvä violetti
    "rgb(125, 100, 190)", // Murrettu laventeli
    "rgb(70, 120, 65)", // Sammaleenvihreä
    "rgb(140, 70, 130)", // Murrettu fuksia
    "rgb(50, 70, 120)", // Tumma sininen
    "rgb(60, 90, 153)", // Sininen, yhtenäinen
    "rgb(75, 105, 135)", // Haalea siniharmaa
    "rgba(20, 25, 30, 0.6)", // Tumma läpinäkyvä
    "rgba(20, 25, 30, 0.6)", // Tumma läpinäkyvä
    "rgba(20, 25, 30, 0.6)", // Tumma läpinäkyvä
    "rgba(20, 25, 30, 0.6)", // Tumma läpinäkyvä
    "rgb(80, 140, 70)", // Sammaleenvihreä
    "rgb(190, 70, 80)", // Pehmeä punainen
    "rgb(80, 140, 70)", // Sammaleenvihreä
    "rgb(80, 140, 70)", // Sammaleenvihreä
    "rgb(60, 90, 153)", // Sininen, yhtenäinen
    "rgb(80, 140, 70)", // Sammaleenvihreä
  ]);
*/
const color = d3
  .scaleOrdinal()
  .domain([
    "VALTIOVARAINMINISTERIÖN HALLINNONALA",
    "SOSIAALI- JA TERVEYSMINISTERIÖN HALLINNONALA",
    "OPETUS- JA KULTTUURIMINISTERIÖN HALLINNONALA",
    "PUOLUSTUSMINISTERIÖN HALLINNONALA",
    "TYÖ- JA ELINKEINOMINISTERIÖN HALLINNONALA",
    "LIIKENNE- JA VIESTINTÄMINISTERIÖN HALLINNONALA",
    "MAA- JA METSÄTALOUSMINISTERIÖN HALLINNONALA",
    "VALTIONVELAN KOROT",
    "SISÄMINISTERIÖN HALLINNONALA",
    "ULKOMINISTERIÖN HALLINNONALA",
    "OIKEUSMINISTERIÖN HALLINNONALA",
    "YMPÄRISTÖMINISTERIÖN HALLINNONALA",
    "VALTIONEUVOSTON KANSLIA",
    "EDUSKUNTA",
    "TASAVALLAN PRESIDENTTI",
    "VEROT JA VERONLUONTEISET TULOT",
    "LAINAT",
    "SEKALAISET TULOT",
    "KORKOTULOT, OSAKKEIDEN MYYNTITULOT JA VOITON TULOUTUKSET",
    "Menot",
    "Tulot",
  ])
  .range([
    "rgb(40, 60, 120)", // Syvä sininen
    "rgb(75, 35, 110)", // Tumma violetti
    "rgb(50, 85, 60)", // Tumma metsänvihreä
    "rgb(40, 70, 90)", // Tumma petrooli
    "rgb(70, 45, 120)", // Tumma syvä violetti
    "rgb(95, 75, 160)", // Tumma laventeli
    "rgb(55, 100, 50)", // Syvä vihreä
    "rgb(120, 55, 110)", // Syvä fuksia
    "rgb(40, 55, 90)", // Syvä tumma sininen
    "rgb(40, 60, 120)", // Syvä sininen (yhtenäinen)
    "rgb(65, 85, 110)", // Tumma siniharmaa
    "rgb(50, 60, 90)", // Tumma harmaa-sininen
    "rgb(70, 55, 100)", // Tumma harmaa-violetti
    "rgb(60, 70, 85)", // Tumma siniharmaa
    "rgb(75, 80, 95)", // Tumma harmaanvihreä
    "rgb(65, 110, 60)", // Tumma sammaleenvihreä
    "rgb(150, 55, 65)", // Tumma punainen
    "rgb(65, 110, 60)", // Tumma sammaleenvihreä
    "rgb(65, 110, 60)", // Tumma sammaleenvihreä
    "rgb(40, 60, 120)", // Syvä sininen
    "rgb(65, 110, 60)", // Tumma sammaleenvihreä
  ]);

const Treemap = ({
  data,
  handleBarClick,
  handleMapClick,
  handleYearChange,
}) => {
  const chartRef = useRef(null);
  const [breadcrumbText, setBreadcrumbText] = React.useState("");
  const [changeImg, setChangeImg] = useState(false);

  useEffect(() => {
    if (!data || !chartRef.current) return;

    const elId = "chart";
    const chartElement = chartRef.current;
    d3.select(`#${elId}`).selectAll("*").remove();
    const divWidth = chartElement.offsetWidth;
    const margin = { top: 50, right: 0, bottom: 20, left: 0 };
    const width = divWidth - 50;

    const height = 720 - margin.top - margin.bottom;

    let transitioning;

    const x = d3.scaleLinear().domain([0, width]).range([0, width]);
    const y = d3.scaleLinear().domain([0, height]).range([0, height]);

    // Treemap layout
    const treemap = d3
      .treemap()
      .tile(
        d3.treemapSquarify.ratio((height / width) * 0.69 * (1 + Math.sqrt(5)))
      )
      .size([width, height])
      .paddingInner(0)
      .round(false);

    // SVG setup
    const root = d3.hierarchy(data);
    treemap(root.sum((d) => d.size).sort((a, b) => b.value - a.value));

    const svg = d3
      .select(`#${elId}`)
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("width", "100%")
      .style("height", "auto")
      .style("margin-left", `${-margin.left}px`)
      .style("margin-right", `${-margin.right}px`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .style("shape-rendering", "crispEdges");

    const headerDiv = d3.select("#headerDiv");
    headerDiv.selectAll("text").remove();
    headerDiv
      .append("text")
      .attr("class", "summateksti")
      .text("Valtion tulot ja menot");

    display(root);

    function display(d) {
      setBreadcrumbText(breadcrumbs(d));
      d3.selectAll(".arrow-left").datum(d.parent);

      d3.select(".arrow-left").on("click", (event, d) => transition(d));

      const headerDiv = d3.select("#headerDiv").data(d);
      headerDiv.selectAll("text").remove();

      headerDiv.selectAll(".arrow-left").text("");

      const headerText = headerDiv.append("text").attr("class", "summateksti");

      headerText.exit().remove();

      headerText
        .selectAll("tspan")
        .data(function (d) {
          if (d.data.name === "flare") {
            return ["Valtion tulot ja menot"];
          }
          if (formatValue(d.value)[1] === 1) {
            return [d.data.name, formatValue(d.value)[0], "mrd. €"];
          } else {
            return [d.data.name, formatValue(d.value)[0], "milj. €"];
          }
        })
        .enter()
        .append("tspan")
        .text(function (d, i) {
          if (i === 0) return d;
          if (i === 1) return d;
          if (i === 2) return d;
        })
        .attr("class", function (d, i) {
          if (i === 1) return "summanumero";
          if (i === 2) return "header-sum-suffix";
        })
        .attr("dx", function (d, i) {
          if (i === 1) return "0";
          if (i === 2) return "10";
        });

      headerDiv
        .selectAll("text")
        .filter((d, i) => i > 0)
        .remove();

      const g1 = svg
        .insert("g", ".grandparent")
        .datum(d)
        .attr("class", "depth")
        .style("fill", function (d, i) {
          return "white";
        });

      const g = g1
        .selectAll("g")
        .data(function (d) {
          return d.children || [];
        })
        .enter()
        .append("g")

        .on("mouseover", function (event, d) {
          if (x(d.x1) - x(d.x0) < 70 || y(d.y1) - y(d.y0) < 53) {
            const tooltip = d3
              .select("body")
              .append("div")
              .attr("class", "tooltip")

              .text(d.data.name);

            tooltip
              .style("left", event.pageX + 5 + "px")
              .style("top", event.pageY + 5 + "px");
          }
        })
        .on("mouseout", function () {
          d3.select(".tooltip").remove();
        });

      g.filter((d) => d.children)
        .classed("children", true)
        .attr("cursor", "pointer")
        .on("click", (event, d) => transition(d));

      g.selectAll(".child")
        .data((d) => d.children || [d])
        .enter()
        .append("rect")
        .attr("class", "child")
        .attr("fill", function (d) {
          return color(d.data.name);
        })

        .call(rect);

      g.append("rect")
        .attr("class", "parent")
        .call(rect)
        .append("title")
        .text(function (d) {
          return d.data.name;
        });

      g.append("foreignObject")
        .call(rect)
        .attr("class", "foreignobj")
        .append("xhtml:div")
        .attr("dy", ".75em")
        .html((d) => {
          let suffix;
          if (formatValue(d.value)[1] === 1) {
            suffix = "mrd.";
          } else {
            suffix = "milj.";
          }
          return (
            "" +
            `<p class="title">${d.data.name}</p>` +
            `<p class="value">${formatValue(d.value)[0]} ${suffix} €</p>`
          );
        })
        .attr("class", function (d) {
          let classes = "textdiv";

          if (d.x1 - d.x0 < 40) {
            classes += " pieni";
          }

          return classes;
        })
        .each(scaleText);

      function transition(d) {
        if (transitioning || !d) return;

        transitioning = true;
        const g2 = display(d),
          t1 = g1.transition().duration(650),
          t2 = g2.transition().duration(650);

        x.domain([d.x0, d.x1]);
        y.domain([d.y0, d.y1]);

        svg.style("shape-rendering", null);

        svg.selectAll(".depth").sort((a, b) => a.depth - b.depth);

        g2.selectAll("text").style("fill-opacity", 0);
        g2.selectAll("foreignObject div").style("display", "none");

        t1.selectAll("text").call(text).style("fill-opacity", 0);
        t2.selectAll("text").call(text).style("fill-opacity", 1);
        t1.selectAll("rect").call(rect);
        t2.selectAll("rect").call(rect);

        t1.selectAll(".textdiv").style("display", "none");

        t1.selectAll(".foreignobj").call(foreign);

        t2.selectAll(".textdiv").style("display", "flex");
        t2.selectAll(".textdiv").style("opacity", function (d) {
          if (Number(y(d.y1) - y(d.y0)) < 43) {
            return 0;
          }

          if (x(d.x1) - x(d.x0) < 70) {
            return 0;
          }

          return 1;
        });

        t2.selectAll(".foreignobj").call(foreign);
        /*
        t2.selectAll(".foreignobj").each(function () {
          scaleText.call(this, d3.select(this).datum());
        });
    */
        t2.on("end", function () {
          svg.selectAll(".foreignobj").each(function (d) {
            scaleText.call(this, d);
          });
        });

        t1.on("end.remove", function () {
          this.remove();
          transitioning = false;
        });
      }

      return g;
    }

    function text(text) {
      text
        .attr("x", function (d) {
          return x(d.x) + 6;
        })
        .attr("y", function (d) {
          return y(d.y) + 6;
        });
    }

    function rect(rect) {
      rect
        .attr("x", function (d) {
          return x(d.x0);
        })
        .attr("y", function (d) {
          return y(d.y0);
        })
        .attr("width", function (d) {
          return x(d.x1) - x(d.x0);
        })
        .attr("height", function (d) {
          return y(d.y1) - y(d.y0);
        })
        .attr("stroke", "gray")
        .attr("stroke-width", 10)
        .attr("fill", function (d) {
          const element = d3.select(this);

          if (element.attr("class") === "child") {
            if (d.depth < 4) {
              return color(d.parent.data.name);
            }

            return color(d.parent.parent.data.name);
          } else {
            if (!d.children) {
              return color(d.parent.parent.data.name);
            }
          }
        });
    }

    function scaleText(d) {
      const width = this.clientWidth;
      const height = this.clientHeight;

      let fontSize = Math.min(width, height) * 0.075;
      const minFontSize = 12;
      const maxFontSize = 22;

      fontSize = Math.max(minFontSize, Math.min(maxFontSize, fontSize));

      if (width < 40 || height < 20) {
        d3.select(this).style("display", "none");
        return;
      }

      d3.select(this)
        .select(".title")
        .style("font-size", fontSize + "px");
      d3.select(this)
        .select(".value")
        .style("font-size", fontSize + 2 + "px");
    }

    function foreign(foreign) {
      foreign
        .attr("x", function (d) {
          return x(d.x0);
        })
        .attr("y", function (d) {
          return y(d.y0);
        })
        .attr("width", function (d) {
          return x(d.x1) - x(d.x0);
        })
        .attr("height", function (d) {
          return y(d.y1) - y(d.y0);
        });
    }

    function breadcrumbs(d) {
      const sep = " > ";

      const breadcrumbArray = d
        .ancestors()
        .reverse()
        .map((node) => {
          if (node.data.name === "flare") {
            return "valtion tulot ja menot";
          }
          return node.data.name;
        })
        .filter((name) => name !== null);
      return breadcrumbArray.length > 0 ? breadcrumbArray.join(sep) : "";
    }

    // Cleanup function
    return () => {
      d3.select(`#${elId}`).selectAll("*").remove();
    };
  }, [data]);

  return (
    <div>
      <div className="wrapper">
        <div className="main clearfix">
          <div className="content-wrapper">
            <div className="content-header-wrapper">
              <h2>TALOUSARVIO 2025</h2>
              <div>(Tietolähde: Hallituksen esitys 2025)</div>
            </div>
            <div className="year-btn-flex">
              <PickYear handleYearChange={handleYearChange} />

              <div className="button-wrapper">
                <div className="barchart-icon-btn" onClick={handleBarClick}>
                  <svg
                    className="barchart-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
                  </svg>
                </div>
                <div
                  className="treemap-icon-btn"
                  onMouseEnter={() => setChangeImg(!changeImg)}
                  onMouseLeave={() => setChangeImg(!changeImg)}
                  onClick={handleMapClick}
                >
                  {!changeImg ? (
                    <img
                      src="../images/data-treemap.svg"
                      alt="Treemap icon"
                      className="treemap-icon"
                    />
                  ) : (
                    <img
                      src="../images/data-treemap_blue.png"
                      alt="Treemap icon"
                      className="treemap-icon"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="headerWrapper">
            <nav className="breadcrumb" aria-label="breadcrumb">
              <h2 className="svg-otsikko"></h2>
              <div className="breadcrumb-treemap">{breadcrumbText}</div>
            </nav>
          </div>

          <div id="headerDiv">
            <span className="arrow-left"></span>
          </div>
        </div>

        <div className="svg-wrapper">
          <div id="chart" ref={chartRef} style={{ maxWidth: "100%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Treemap;
