import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Barchart2 = () => {
    const ref = useRef();
  
    useEffect(() => {
  
        const getTextWidth = (text, fontSize = 18) => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            context.font = `${fontSize}px 'Poppins', sans-serif`;
            return context.measureText(text.toUpperCase()).width;
          };
          
          const margin = { top: 30, right: 0, bottom: 0, left: 0 };
          const width = 1500 - margin.left - margin.right;
          const height = 1200 - margin.top - margin.bottom;
          let barHeight = 77;
          if (window.innerWidth < 700) {
            barHeight = 150
          }
          //let heightRatio = window.innerHeight / 1000; // Esimerkiksi 1000 voisi olla "perusyksikkö"
         // let dynamicHeight = Math.max(barHeight * heightRatio, 77);
         
        
          
          const color = d3.scaleOrdinal()
            .domain([
              "VALTIOVARAINMINISTERIÖN HALLINNONALA", "SOSIAALI- JA TERVEYSMINISTERIÖN HALLINNONALA",
              "OPETUS- JA KULTTUURIMINISTERIÖN HALLINNONALA", "PUOLUSTUSMINISTERIÖN HALLINNONALA",
              "TYÖ- JA ELINKEINOMINISTERIÖN HALLINNONALA", "LIIKENNE- JA VIESTINTÄMINISTERIÖN HALLINNONALA",
              "MAA- JA METSÄTALOUSMINISTERIÖN HALLINNONALA", "VALTIONVELAN KOROT",
              "SISÄMINISTERIÖN HALLINNONALA", "ULKOMINISTERIÖN HALLINNONALA",
              "OIKEUSMINISTERIÖN HALLINNONALA", "YMPÄRISTÖMINISTERIÖN HALLINNONALA",
              "VALTIONEUVOSTON KANSLIA", "EDUSKUNTA", "TASAVALLAN PRESIDENTTI",
              "VEROT JA VERONLUONTEISET TULOT", "LAINAT", "SEKALAISET TULOT",
              "KORKOTULOT, OSAKKEIDEN MYYNTITULOT JA VOITON TULOUTUKSET", "Menot", "Tulot"
            ])
            .range([
              "rgb(43, 72, 151)", "rgb(109, 26, 160)", "rgb(43, 82, 0)",
              "rgb(36, 72, 94)", "rgb(82, 26, 150)", "rgb(139, 92, 214)",
              "rgb(57, 123, 43)", "rgb(170, 56, 154)", "rgb(32, 54, 113)",
              "rgb(43, 72, 151)", "rgb(54, 109, 142)", "rgba(5, 11, 19, 0.5)",
              "rgba(5, 11, 19, 0.5)", "rgba(5, 11, 19, 0.5)", "rgba(5, 11, 19, 0.5)",
              "rgb(71, 154, 54)", "rgb(237, 41, 57)", "rgb(71, 154, 54)", "rgb(71, 154, 54)",
              "rgb(43, 72, 151)", "rgb(71, 154, 54)"
            ]);
          
          const svg = d3.select(ref.current)
            //.select("svg")
            .attr('class', 'main-svg')
            .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
            .attr("preserveAspectRatio", "xMidYMin meet")
            .style("width", "100%")
            .style("height", "auto")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
          
          svg.insert("rect", ":first-child")
            .attr("class", "background")
            .attr("id", "background-rect")
            .attr("width", width)
            
            .attr("height", height)
            .style('fill', 'rgb(255, 255, 255, 0.7');
          
        
          // Lisää kuuntelija ikkunan koon muutoksiin
        
          
          const partitionLayout = d3.partition().size([width, height]);
          
          d3.json("data.json").then(data => {
            const combinedRoot = d3
              .hierarchy(data)
              .sum(d => d.size)
              .sort((a, b) => b.value - a.value);
          
            combinedRoot.each(node => {
              if (node.children) {
                node.children = node.children.filter(child => child.value > 0);
              }
            });
          
            partitionLayout(combinedRoot);
            initializeChart(combinedRoot);
        
         
          });
          
          function initializeChart(root) {
            const nodes = svg.selectAll(".node")
              .data(root.children || [])
              .enter()
              .append("g")
              .attr("class", "node")
              .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
              .attr("preserveAspectRatio", "xMidYMin meet")
              .attr("id", (d, i) => `node-${i}`)
              .attr("transform", function(d, i) {
                      return `translate(0,${i * (barHeight + 8)})` 
              })
              .on("click", (event, d) => update(d));
          
            nodes.append("rect")
              .attr("id", (d, i) => `rect-${i}`)
              .attr('cursor', 'pointer')
              //.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
              //.attr("preserveAspectRatio", "xMidYMin meet")
              .attr("width", d => d.value ? getXScale(root)(d.value) : 0)
              .attr("height", barHeight)
            //  .attr("height", dynamicHeight) 
              .attr("class", "rect")
              .style("fill", d => color(d.data.name))
              .style("stroke", "#fff");
        
           
          
            addText(nodes, root);
          }
          
          function getXScale(node) {
            return d3.scaleLinear()
              .domain([0, d3.max(node.children || [], d => d.value)])
              .range([0, width]);
          }
          
          function addText(nodes, parentNode) {
            const xScale = getXScale(parentNode);
          
            const text = nodes.append("text")
              .attr("x", 10)
              .attr("y", barHeight / 2)
              .attr("dy", "0.35em")
              .attr("class", "text")
              .attr('cursor', 'pointer')
              .style("fill", d => getTextColor(d, xScale))
              .attr('transform', function(d) {
                const fillColor = d3.select(this).style('fill');
                if (fillColor === 'white') {
                  return 'translate(10, 0)';
                }
                return `translate(${xScale(d.value)}, 0)`;
              });
          
            text.append('tspan').text(d => d.data.name);
          
            text.append("tspan")
              .attr('class', 'summat')
              .attr('dx', '10')
              .attr('dy', '1')
              .text(d => formatValue(d.value));
          
            text.append("tspan")
              .attr("class", "sumSuffix")
              .attr('dy', '0')
              .text(d => (d.value > 1e9) ? " mrd. €" : " milj. €");
          }
          
          function getTextColor(d, xScale) {
            const rectWidth = xScale(d.value || 0);
            const fullText = `${d.data.name} ${(d.value / 1e9).toFixed(1)} (ekstra) mrd. €`;
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
            const val = value / (value > 1e9 ? 1e9 : 1e6);
            return val.toLocaleString("fi-FI", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
          }
          
         
        
          function update(node) {
            if (!node.data.children ) return;  
           
            
            const xScale = getXScale(node);
            const svgElement = d3.select(ref.current);
            const nodes = svgElement.selectAll(".node")
            .data(node.children || [], (d, i) => d.data.name + '-' + i);
          
            const breadcrumb = d3.select('.breadcrumb')
              .selectAll('.breadcrumb-item')
              
              .data(node.ancestors().reverse()); 
           
        
              const headerDiv = d3.select('#headerDiv').data(node);
              headerDiv.selectAll('text').remove();
             
              headerDiv.selectAll('.arrow-left')
                .text(''); 
              
              
              const headerText = headerDiv.append('text')
              .attr('class', 'summateksti');
        
           
            headerText.exit().remove();
         
            nodes        
            .exit()
           // .attr('opacity', 1) 
            .transition()
            .duration(750)
            .attr('opacity', 0) 
            .remove();

            breadcrumb.exit().remove();
          
          
        
            
          
            headerText.selectAll('tspan')    
            .data(function(d) {     
              if (d.data.name === 'flare') {
                return ['Valtion tulot ja menot']
              }
              return [d.data.name, formatValue(d.value), 'mrd. €']; // Päivitä arvot
            })
            .enter()
            .append('tspan')    
            .text(function(d, i) {    
                if (i === 0) return d; // Ensimmäinen tspan on nimi
                if (i === 1) return d; // Toinen tspan on arvo (muotoiltu)
                if (i === 2) return d; // Kolmas tspan on "mrd. €"     
            })
            .attr('class', function(d, i) {
              // Päivitä class
              if (i === 1) return 'summanumero'; // Arvot (summateksti)
              if (i === 2) return 'header-sum-suffix'; // Liite (mrd. €)
            })
            .attr('dx', function(d, i) {
                // Päivitä class
                if (i === 1) return '0'; // Arvot (summateksti)
                if (i === 2) return '10'; // Liite (mrd. €)
              });
           
        
          headerDiv.selectAll('text')
          .filter((d, i) => i > 0) // Suodattaa kaikki elementit paitsi ensimmäisen
          .remove(); // Poistaa ylimääräiset `h2`-elementit
        
        // Lisää uudet span-elementit
        
              
              
          
        breadcrumb.enter()
          .append('div')
          .attr('class', 'breadcrumb-item')
          .text(function (d) { 
            if (d.depth === 1) {
              return 'Valtion tulot ja menot'; // Kun depth on 1, aseta tekstiksi 'Valtion tulot ja menot'
            }
            if (d.depth > 1) {
              if (d.data.name === 'flare') {
                return 'Valtion tulot'; // Jos data.name on 'flare', aseta 'Valtion tulot'
              } else {
               
                return d.parent.data.name; // Muutoin aseta d.data.name
              }
            }
            return ''; // Jos d.depth ei ole 1 tai suurempi kuin 1, palauta tyhjä merkkijono
          });
        
        // Päivitä olemassa olevat breadcrumbit
        breadcrumb
          .text(function (d) { 
            if (d.depth === 1) {
              return 'Valtion tulot ja menot'; 
            }
            if (d.depth > 1) {
              if (d.data.name === 'flare') {
                return 'Valtion tulot'; 
              } else {
                return d.parent.data.name; 
              }
            }
            return ''; // Tyhjennä, jos ei ole depth > 1
          });
        
              
            const enterNodes = nodes.enter().append("g")
              .attr("class", "node")
              .attr("id", (d, i) => `node-${i}`)
              .attr('cursor', 'pointer')
              .attr("transform", function(d, i) {   
              
                return `translate(${d.x1 / 2 * i}, 0)`;
              }) 
              .on("click", (event, d) => update(d));
        
            enterNodes
            .transition()
            .duration(500)
            
            .each(function(d, i) {
              console.log('Entered node data:', d);
        
                const element = d3.select(this);
                
            
                const rectWidth = xScale(d.value) ;
                const rectHeight = barHeight;
             
            
               
                const pieces = d.parent?.parent?.children?.length || 2;
            
                const data = d3.range(pieces); 
              
                element.selectAll("rect.part")
                  .data(data)
                  .enter()
        
                  .append("rect")
                  .attr('opacity', '1')
                  .attr("class", "part")
                  
                  .attr("x", rectWidth - (rectWidth / pieces))
                  
                  .attr("y", 50) 
                  .attr("width", rectWidth / pieces)
                  .attr("height", rectHeight)
                  .style("fill", colorPicker(d))
                  .style("stroke", "#fff")
                  .each(function(d, i) {
                    console.log(d,i)
                    const newElement = d3.select(this)
                    newElement.attr("transform", function(i, d) {   
                          
                        return `translate(${0}, 0)`;
                      }) 
                  })
                  
                  .transition()
                  .duration(500)
                  .attr('opacity', '0')
        
                  .attr("transform", (d, i) => `translate(${(-1) * (rectWidth - (rectWidth / pieces))},${i * (barHeight + 8)})`)
                
                  .attr("y", 0) 
                  
            })
            enterNodes
              .transition()
              .duration(500)
              .attr("transform", (d, i) => `translate(0,${i * (barHeight + 8)})`)
          
            enterNodes.append("rect")
              .attr("id", (d, i) => `rect-${i}`)
              .attr("width", d => d.value ? xScale(d.value) : 0)
              .attr("height", barHeight)
              .style("fill", function(d) {
          return colorPicker(d)
              } )
              .style("stroke", "#fff");
        
        
              
          
            addText(enterNodes, node);
        
            d3.selectAll('.arrow-left')
            .data(node)
              .text('')
              .attr('class', function(d) {
                 
                  return d.depth === 0 ? 'arrow-left disabled' : 'arrow-left';
              })
          
            d3.select('.arrow-left')
            .on('click', function() {
               
              up(node)
            });
          
          }
         
        
          function goUp(node) {
            if (d3.active(d3.selectAll('.node').node())) {
                return;
            }
            if (!node.parent || !d3.select(ref.current).selectAll(".exit").empty()) return;

           // if (!node.parent || d3.active(svg.node())) return;
           // if (!node.parent || this.__transition__) return; // Tarkistaa, että on olemassa parent-solmu
        
            const parentNode = node.parent; // Siirtyminen parent-solmuun
            const xScale = getXScale(parentNode);
        
            // Hae kaikki solmut ja breadcrumbit
            const nodes = d3.select(ref.current).selectAll(".node")
                //.data(parentNode.children || [], d => d.data.name);
                .data(parentNode.children || [], (d, i) => d.data.name + '-' + i);
            
            const breadcrumb = d3.select('.breadcrumb')
                .selectAll('.breadcrumb-item')
                .data(parentNode.ancestors().reverse());
        
            // Poista ylimääräiset solmut (EXIT-animaatio)
            nodes.exit()
                .transition()
                .duration(750)
                .attr("transform", (d, i) => `translate(${xScale(d.value)}, 0)`) // Solmut liikkuvat ulos oikealle
                .attr('opacity', 0)
                .remove();
        
        
            
            // Päivitä olemassa olevat solmut
            nodes
                .transition()
                .duration(750)
                .attr("transform", (d, i) => `translate(${i * (barHeight + 8)}, 0)`); // Päivitetään sijainti
        
            // Lisää uudet solmut (ENTER-animaatio)
            const enterNodes = nodes.enter().append("g")
                .attr("class", "node")
                .attr("transform", (d, i) => `translate(${xScale(d.value)}, 0)`) // Tulevat näkyviin vasemmalta
                .on("click", (event, d) => update(d)); // Navigointi eteenpäin
        
            enterNodes.transition()
                .duration(600)
                .attr("transform", (d, i) => `translate(0, ${i * (barHeight + 8)})`); // Päätyvät oikeaan sijaintiin
        
            enterNodes.append("rect")
                .attr("width", d => d.value ? xScale(d.value) : 0)
                .attr("height", barHeight)
                .attr('cursor', 'pointer')
                .style("fill", d => colorPicker(d))
                .style("stroke", "#fff");
        
            addText(enterNodes, parentNode);
        
            // Päivitä leivänmurut
            breadcrumb.enter()
                .append('div')
                .attr('class', 'breadcrumb-item')
                .text(d => d.data.name);
        
            breadcrumb.exit().remove();
        
            const headerDiv = d3.select('#headerDiv').datum(node); // Sitoutuu yksittäiseen dataan
        
            headerDiv.selectAll('.summateksti').remove(); // Poista aiemmat elementit
            
            const headerText = headerDiv.append('text')
              .attr('class', 'summateksti');
           
            // Lisää/päivitä tspan-elementit
            headerText.selectAll('tspan')
            .data(function(d) {     
           
              if (d.parent.data.name === 'flare') {
                
                return ['Valtion tulot ja menot']
              }
              return [d.parent.data.name, formatValue(d.parent.value), 'mrd. €']; // Päivitä arvot
            })
              .join(
                enter => enter.append('tspan')
                              .text(function(d) {
                             
                                return(d)
                              })
                              .attr('class', (d, i) => i === 1 ? 'summanumero' : i === 2 ? 'header-sum-suffix' : null)
                              .attr('dx', (d, i) => i === 2 ? '10' : '0'),
                update => update.text(d => d), // Päivitä tekstit
                exit => exit.remove() // Poista ylimääräiset
              );
        
           
            
              d3.selectAll('.arrow-left')
              .data(node)
                .text('')
                .attr('class', function(d) {
                   
                    return d.depth === 1 ? 'arrow-left disabled' : 'arrow-left';
                })
        
            d3.select('.arrow-left')
                .on('click', () => goUp(parentNode)); // Aseta uusi parent linkiksi
        }
        
        
        
        
          
          // Up function to go to parent
          function up(node) {
            if (!node.parent) return;
            goUp(node);
        }
  
    }, []);
  
    return       <div>
        <div className="main-header">
        <h1>valtion budjetti 2025</h1>
      </div>
      
      <div className="wrapper">
        <div className="main clearfix">
          <div className="content-wrapper">
            <h2>TALOUSARVIO 2025</h2>
            <div>Tietolähde: Hallituksen esitys 2025</div>
          </div>
     
          <div className="headerWrapper">
            <nav className="breadcrumb" aria-label="breadcrumb">
              <h2 className="svg-otsikko"></h2>
            </nav>
          </div>
          
          <div id="headerDiv"><span className="arrow-left"></span></div>
        </div>
        
        <div className="svg-wrapper">
          <svg width="1700" height="2000" ref={ref}></svg>
        </div>
      </div>
      
          
</div>
  };

  export default Barchart2;