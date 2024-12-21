import * as d3 from "d3";
import { useEffect, useRef } from "react";
import "../index.css";
const Barchart2 = ({ handleBarClick, handleMapClick }) => {
  const ref = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const getTextWidth = (text, fontSize = 1.5) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.font = `${fontSize}em 'Poppins', sans-serif`;

      return context.measureText(text.toUpperCase()).width;
    };

    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    let width = 1700 - margin.left - margin.right;
    let height = 1200 - margin.top - margin.bottom;

    if (window.innerWidth < 800) {
      width = 900;
      height = 1000;
    }
    let barHeight = 88;
    if (window.innerWidth < 700) {
      barHeight = 80;
    }

    const splitText = (text) => {
      const teksti = text.trim();
      const words = teksti.split(" ");

      if (words.length < 2) {
        return [text];
      }
      if (words.length > 6) {
        const firstLine = words.slice(0, 3).join(" ");
        const secondLine = words.slice(3, 6).join(" ");
        const thirdLine = words.slice(-1).join(" ");

        return [firstLine, secondLine, thirdLine];
      }
      if (words.length > 5) {
        const firstLine = words.slice(0, -3).join(" ");
        const secondLine = words.slice(-3).join(" ");

        return [firstLine, secondLine];
      }
      if (words.length > 4) {
        const firstLine = words.slice(0, -2).join(" ");
        const secondLine = words.slice(-2).join(" ");

        return [firstLine, secondLine];
      }

      const firstLine = words.slice(0, -1).join(" ");
      const secondLine = words[words.length - 1];

      return [firstLine, secondLine];
    };
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
        "rgb(43, 72, 151)",
        "rgb(109, 26, 160)",
        "rgb(43, 82, 0)",
        "rgb(36, 72, 94)",
        "rgb(82, 26, 150)",
        "rgb(139, 92, 214)",
        "rgb(57, 123, 43)",
        "rgb(170, 56, 154)",
        "rgb(32, 54, 113)",
        "rgb(43, 72, 151)",
        "rgb(54, 109, 142)",
        "rgba(5, 11, 19, 0.5)",
        "rgba(5, 11, 19, 0.5)",
        "rgba(5, 11, 19, 0.5)",
        "rgba(5, 11, 19, 0.5)",
        "rgb(71, 154, 54)",
        "rgb(237, 41, 57)",
        "rgb(71, 154, 54)",
        "rgb(71, 154, 54)",
        "rgb(43, 72, 151)",
        "rgb(71, 154, 54)",
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
        "rgba(15, 20, 25, 0.8)", // Tumma läpinäkyvä (syvempi)
        "rgba(15, 20, 25, 0.8)", // Tumma läpinäkyvä
        "rgba(15, 20, 25, 0.8)", // Tumma läpinäkyvä
        "rgba(15, 20, 25, 0.8)", // Tumma läpinäkyvä
        "rgb(65, 110, 60)", // Tumma sammaleenvihreä
        "rgb(150, 55, 65)", // Tumma punainen
        "rgb(65, 110, 60)", // Tumma sammaleenvihreä
        "rgb(65, 110, 60)", // Tumma sammaleenvihreä
        "rgb(40, 60, 120)", // Syvä sininen
        "rgb(65, 110, 60)", // Tumma sammaleenvihreä
      ]);

    const svg = d3
      .select(ref.current)

      .attr("class", "main-svg")
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .attr("preserveAspectRatio", "xMidYMin meet")
      .style("width", "100%")
      //.style("height", "auto")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .insert("rect", ":first-child")
      .attr("class", "background")
      .attr("id", "background-rect")
      .attr("width", width)

      .attr("height", height)
      .style("fill", "rgb(255, 255, 255, 0.7");

    const partitionLayout = d3.partition().size([width, height]);

    d3.json("eduskunnan_kirjelma_muunnettu.json").then((data) => {
      const combinedRoot = d3
        .hierarchy(data)
        .sum((d) => d.size)
        .sort((a, b) => b.value - a.value);

      combinedRoot.each((node) => {
        if (node.children) {
          node.children = node.children.filter((child) => child.value > 0);
        }
      });

      partitionLayout(combinedRoot);
      initializeChart(combinedRoot);
    });

    function initializeChart(root) {
      const nodes = svg
        .selectAll(".node")
        .data(root.children || [])
        .enter()
        .append("g")
        .attr("class", "node")
        .attr(
          "viewBox",
          `0 0 ${width + margin.left + margin.right} ${
            height + margin.top + margin.bottom
          }`
        )
        .attr("preserveAspectRatio", "xMidYMin meet")
        .attr("id", (d, i) => `node-${i}`)
        .attr("transform", function (d, i) {
          return `translate(0,${i * (barHeight + 8)})`;
        })
        .on("click", (event, d) => update(d));

      nodes
        .append("rect")
        .attr("id", (d, i) => `rect-${i}`)
        .attr("cursor", "pointer")

        .attr("width", (d) => (d.value ? getXScale(root)(d.value) : 0))
        .attr("height", barHeight)

        .attr("class", "rect")
        .style("fill", (d) => color(d.data.name))
        .style("stroke", "#fff");

      addText(nodes, root);
    }

    function getXScale(node) {
      return d3
        .scaleLinear()
        .domain([0, d3.max(node.children || [], (d) => d.value)])
        .range([0, width]);
    }

    const headerDiv = d3.select("#headerDiv");
    headerDiv.selectAll("text").remove();
    headerDiv
      .append("text")
      .attr("class", "summateksti")
      .text("Valtion tulot ja menot");

    function addText(nodes, parentNode) {
      const xScale = getXScale(parentNode);

      const text = nodes
        .append("text")
        .attr("x", 10)
        .attr("y", barHeight / 2)
        .attr("dy", "0.35em")
        .attr("class", "text")
        .attr("cursor", "pointer")
        .style("fill", (d) => getTextColor(d, xScale))

        .attr("transform", function (d) {
          const fillColor = d3.select(this).style("fill");
          if (fillColor === "white") {
            return "translate(10, 0)";
          }
          return `translate(${xScale(d.value)}, 0)`;
        });

      text.each(function (d) {
        const selection = d3.select(this);
        const tarkistus = checkIfWide(d, xScale);

        if (tarkistus === "yli") {
          const longText = splitText(d.data.name);
          if (longText.length > 2) {
            selection
              .append("tspan")
              .text(longText[0])
              //.attr("x", 0)
              .attr("dy", -15);

            selection
              .append("tspan")
              .text(longText[1])
              .attr("x", 10)
              .attr("dy", "1.35em");

            selection
              .append("tspan")
              .text(longText[2])
              .attr("x", 10)
              .attr("dy", "1.35em");
          } else if (longText.length < 2) {
            selection.append("tspan").text(d.data.name);
          } else {
            selection
              .append("tspan")
              .text(longText[0])
              //.attr("x", 0)
              .attr("dy", -8);

            selection
              .append("tspan")
              .text(longText[1])
              .attr("x", 10)
              .attr("dy", "1.35em");
          }
        } else {
          selection.append("tspan").text(d.data.name);
          //.attr("x", 0)
          //.attr("dy", 0);
        }
      });

      text
        .append("tspan")
        .attr("class", "summat")
        .attr("dx", "10")
        .attr("dy", "1")
        .text((d) => formatValue(d.value)[0]);

      text
        .append("tspan")
        .attr("class", "sumSuffix")
        .attr("dy", "0")
        .text((d) => (d.value > 1e9 ? " mrd. €" : " milj. €"));
    }

    function checkIfWide(d, xScale) {
      const rectWidth = xScale(d.value || 0);
      const fullText = `${d.data.name} ${(d.value / 1e9).toFixed(
        1
      )} (e   k   s    t    ra) mrd. €`;
      const textWidth = getTextWidth(fullText);
      return rectWidth < textWidth ? "yli" : "ali";
    }

    function getTextColor(d, xScale) {
      const rectWidth = xScale(d.value || 0);
      const fullText = `${d.data.name} ${(d.value / 1e9).toFixed(
        1
      )} (ekstra) €`;

      const textWidth = getTextWidth(fullText);
      return rectWidth < textWidth ? colorPicker(d) : "white";
    }

    function colorPicker(d) {
      if (d.depth > 3) {
        return color(d.parent.parent.data.name);
      }
      if (d.depth === 3) {
        return color(d.parent.data.name);
      }
      if (d.depth === 2) {
        return color(d.data.name);
      }
      return color(d.data.name);
    }

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

    function update(node) {
      if (!node.data.children) return;

      const xScale = getXScale(node);
      const svgElement = d3.select(ref.current);
      const nodes = svgElement
        .selectAll(".node")
        .data(node.children || [], (d, i) => d.data.name + "-" + i);

      const breadcrumb = d3
        .select(".breadcrumb")
        .selectAll(".breadcrumb-item")

        .data(node.ancestors().reverse());

      const headerDiv = d3.select("#headerDiv").data(node);
      headerDiv.selectAll("text").remove();

      headerDiv.selectAll(".arrow-left").text("");

      const headerText = headerDiv.append("text").attr("class", "summateksti");

      headerText.exit().remove();

      nodes
        .exit()

        .transition()
        .duration(750)
        .attr("opacity", 0)
        .remove();

      breadcrumb.exit().remove();

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

      breadcrumb
        .enter()
        .append("div")
        .attr("class", "breadcrumb-item")
        .text(function (d) {
          if (d.depth === 1) {
            return "Valtion tulot ja menot";
          }
          if (d.depth > 1) {
            if (d.data.name === "flare") {
              return "Valtion tulot";
            } else {
              return d.parent.data.name;
            }
          }
          return "";
        });

      breadcrumb.text(function (d) {
        if (d.depth === 1) {
          return "Valtion tulot ja menot";
        }
        if (d.depth > 1) {
          if (d.data.name === "flare") {
            return "Valtion tulot";
          } else {
            return d.parent.data.name;
          }
        }
        return "";
      });

      const enterNodes = nodes
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("id", (d, i) => `node-${i}`)
        .attr("cursor", "pointer")
        .attr("transform", function (d, i) {
          return `translate(${(d.x1 / 2) * i}, 0)`;
        })
        .on("click", (event, d) => update(d));

      enterNodes
        .transition()
        .duration(500)

        .each(function (d, i) {
          const element = d3.select(this);

          const rectWidth = xScale(d.value);
          const rectHeight = barHeight;

          const pieces = d.parent?.parent?.children?.length || 2;

          const data = d3.range(pieces);

          element
            .selectAll("rect.part")
            .data(data)
            .enter()

            .append("rect")
            .attr("opacity", "1")
            .attr("class", "part")

            .attr("x", rectWidth - rectWidth / pieces)

            .attr("y", 50)
            .attr("width", rectWidth / pieces)
            .attr("height", rectHeight)
            .style("fill", colorPicker(d))
            .style("stroke", "#fff")
            .each(function (d, i) {
              const newElement = d3.select(this);
              newElement.attr("transform", function (i, d) {
                return `translate(${0}, 0)`;
              });
            })

            .transition()
            .duration(500)
            .attr("opacity", "0")

            .attr(
              "transform",
              (d, i) =>
                `translate(${-1 * (rectWidth - rectWidth / pieces)},${
                  i * (barHeight + 8)
                })`
            )

            .attr("y", 0);
        });
      enterNodes
        .transition()
        .duration(500)
        .attr("transform", (d, i) => `translate(0,${i * (barHeight + 8)})`);

      enterNodes
        .append("rect")
        .attr("id", (d, i) => `rect-${i}`)
        .attr("width", (d) => (d.value ? xScale(d.value) : 0))
        .attr("height", barHeight)
        .style("fill", function (d) {
          return colorPicker(d);
        })
        .style("stroke", "#fff");

      addText(enterNodes, node);

      d3.selectAll(".arrow-left")
        .data(node)
        .text("")
        .attr("class", function (d) {
          return d.depth === 0 ? "arrow-left disabled" : "arrow-left";
        });

      d3.select(".arrow-left").on("click", function () {
        up(node);
      });
    }

    function goUp(node) {
      if (d3.active(d3.selectAll(".node").node())) {
        return;
      }
      if (!node.parent || !d3.select(ref.current).selectAll(".exit").empty())
        return;

      const parentNode = node.parent;
      const xScale = getXScale(parentNode);

      const nodes = d3
        .select(ref.current)
        .selectAll(".node")

        .data(parentNode.children || [], (d, i) => d.data.name + "-" + i);

      const breadcrumb = d3
        .select(".breadcrumb")
        .selectAll(".breadcrumb-item")
        .data(parentNode.ancestors().reverse());

      nodes
        .exit()
        .transition()
        .duration(750)
        .attr("transform", (d, i) => `translate(${xScale(d.value)}, 0)`)
        .attr("opacity", 0)
        .remove();

      nodes
        .transition()
        .duration(750)
        .attr("transform", (d, i) => `translate(${i * (barHeight + 8)}, 0)`);

      const enterNodes = nodes
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d, i) => `translate(${xScale(d.value)}, 0)`)
        .on("click", (event, d) => update(d));
      enterNodes
        .transition()
        .duration(600)
        .attr("transform", (d, i) => `translate(0, ${i * (barHeight + 8)})`);

      enterNodes
        .append("rect")
        .attr("width", (d) => (d.value ? xScale(d.value) : 0))
        .attr("height", barHeight)
        .attr("cursor", "pointer")
        .style("fill", (d) => colorPicker(d))
        .style("stroke", "#fff");

      addText(enterNodes, parentNode);

      breadcrumb
        .enter()
        .append("div")
        .attr("class", "breadcrumb-item")
        .text((d) => d.data.name);

      breadcrumb.exit().remove();

      const headerDiv = d3.select("#headerDiv").datum(node);
      headerDiv.selectAll(".summateksti").remove();
      const headerText = headerDiv.append("text").attr("class", "summateksti");

      headerText
        .selectAll("tspan")
        .data(function (d) {
          console.log(d.parent);
          if (d.parent.data.name === "flare") {
            return ["Valtion tulot ja menot"];
          }
          if (formatValue(d.value)[1] === 1) {
            return [
              d.parent.data.name,
              formatValue(d.parent.value)[0],
              "mrd. €",
            ];
          } else {
            return [
              d.parent.data.name,
              formatValue(d.parent.value)[0],
              "milj. €",
            ];
          }
        })
        .join(
          (enter) =>
            enter
              .append("tspan")
              .text(function (d) {
                return d;
              })
              .attr("class", (d, i) =>
                i === 1 ? "summanumero" : i === 2 ? "header-sum-suffix" : null
              )
              .attr("dx", (d, i) => (i === 2 ? "10" : "0")),
          (update) => update.text((d) => d),
          (exit) => exit.remove()
        );

      d3.selectAll(".arrow-left")
        .data(node)
        .text("")
        .attr("class", function (d) {
          return d.depth === 1 ? "arrow-left disabled" : "arrow-left";
        });

      d3.select(".arrow-left").on("click", () => goUp(parentNode));
    }

    function up(node) {
      if (!node.parent) return;
      goUp(node);
    }
  }, []);

  return (
    <div>
      <div className="wrapper">
        <div className="main clearfix">
          <div className="content-wrapper">
            <div className="content-header-wrapper">
              <h2>TALOUSARVIO 2025</h2>
              <div>(Tietolähde: Hallituksen esitys 2025)</div>
            </div>
            <div className="button-wrapper">
              <div className="barchart-icon-btn" onClick={handleBarClick}>
                {" "}
                <img
                  src="../images/bar-chart.svg"
                  alt="Barchart icon"
                  className="barchart-icon"
                />
              </div>
              <div className="treemap-icon-btn" onClick={handleMapClick}>
                {" "}
                <img
                  src="../images/data-treemap.svg"
                  alt="Treemap icon"
                  className="treemap-icon"
                />
              </div>
            </div>
          </div>

          <div className="headerWrapper">
            <nav className="breadcrumb" aria-label="breadcrumb">
              <h2 className="svg-otsikko"></h2>
            </nav>
          </div>

          <div id="headerDiv">
            <span className="arrow-left"></span>
          </div>
        </div>

        <div className="svg-wrapper">
          <svg width="1500" ref={ref}></svg>
        </div>
      </div>
    </div>
  );
};

export default Barchart2;
