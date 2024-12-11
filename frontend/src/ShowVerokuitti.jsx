import * as d3 from "d3";



import { useEffect, useRef, useState } from "react";
import './kuitti.css';


const ShowVerokuitti = ({ summa }) => {
    const [vero, setVero] = useState('');
    //const [openedNodes, setOpenedNodes] = useState([]); 
    const nuoliClicked = useRef(false);
    const chartRef = useRef(null); // Ref käytetään D3:n hallitsemaan osaan

    const laskeVero = (tulot) => {
        const monthlyIncome = parseFloat(tulot);
        const annualIncome = monthlyIncome * 12;
        let tax = 0;  // Lasketaan vero

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

        setVero(`Verosi: €${tax.toFixed(2)}`);
        return tax;
    };
    

    useEffect(() => {
        const taxValue = laskeVero(summa);

        // D3 käyttää vain chartRef-alueen DOM-elementtejä
        d3.json("uusiMenot.json").then(data => {
            const root = d3.hierarchy(data)
                .sum(d => d.size)
                .sort((a, b) => b.value - a.value);

            root.each(node => {
                if (node.children) {
                    node.children = node.children.filter(child => child.value > 0);
                }
            });

            const totalValue = root.value;
            initializeChart(root, totalValue, taxValue);
        });

        return () => {
            // Poistetaan D3:n luomat elementit ennen seuraavaa renderöintiä
            d3.select(chartRef.current).selectAll("*").remove();
        };
    }, []); // Päivitä aina kun summa muuttuu

    function initializeChart(root, totalValue, taxValue) {
        const container = d3.select(chartRef.current);

        const nodes = container
            .selectAll(".node-wrapper")
            .data(root.children[0].children || [])
            .enter()
            .append('div')
            .attr('class', 'node-wrapper');

        const mainLukuWrapper = nodes
            .append('div')
            .attr('class', 'main-luku-wrapper');

        mainLukuWrapper
        
       
            .append('div')
            .attr('class', 'nodeb')
            .text(d => {
                const prosentti = (d.value / totalValue) * 100;
                const euroSumma = (prosentti / 100) * taxValue;
                let nimi = d.data.name.split(' ');
                nimi = nimi.filter(e => e !== 'HALLINNONALA');
                return `${nimi.join(' ')}: €${euroSumma.toFixed(2)}`;
            });

            mainLukuWrapper
            .append('div')
            .attr('class', 'nuoli')
            .attr('width', 24)
            .attr('height', 24)
            //.html(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.29 7.29L12.59 3l4.3 4.29-1.42 1.42L13 6.83V18h-2V6.83L8.29 8.71z"/></svg>`)
            /*.each(function (d) {
                const root = createRoot(this); // Luo root jokaiselle diville
                root.render(<ArrowRightIcon />); // Renderöi Material-UI-ikoni Reactilla
              })
                */
              .on("click", (event, d) => {
                // Vaihdetaan luokan tila
                //nuoliClicked.current = !nuoliClicked.current;
                if (nuoliClicked.current) {
                    d3.select(event.currentTarget) // Valitsee klikattavan elementin
                    .classed('active', false);
                } else {
                    d3.select(event.currentTarget) // Valitsee klikattavan elementin
                    .classed('active', true);
                }
                // Lisätään/poistetaan 'active' luokka elementistä
                console.log()
                d3.select(this)
                  .classed('active', true);
              
                // Kutsutaan update-funktiota
                update(d, taxValue, event);
              });
    }

    function update(node, taxValue, event) {
        if (!node.data.children || node.__transition__) return;
       
        if (nuoliClicked.current) {
            // Poistetaan elementit, jos nuoli on jo klikattu
            console.log('Poistetaan elementit');
            console.log('täällä', event.currentTarget)
           

            d3.selectAll('.osasto-menot').remove(); // Poistaa nykyiset elementit
            nuoliClicked.current = false;
            return // Asetetaan tila takaisin falseksi
        } else {
            // Lisätään elementit ensimmäisellä klikkauksella
           

            console.log('Lisätään elementit');
            nuoliClicked.current = true; 
        }
        console.log('event', event.currentTarget)
        
        const targetElement = event.currentTarget;
        const nodeWrapperElement = targetElement.closest('.node-wrapper'); // Valitaan oikea elementti
       console.log('nodewrapper', nodeWrapperElement)
        //const container = d3.select(chartRef.current).select('.node-wrapper');
        const container = d3.select(nodeWrapperElement);
        const wrapper = container
            .selectAll(".osasto-menot")
            .data([node]);
            console.log(container.node());
        wrapper.exit().remove();

        const enterWrapper = wrapper.enter()
            .append('div')
            .attr('class', 'osasto-menot');

        const nodes = enterWrapper.merge(wrapper)
            .selectAll(".nodeb")
            .data(node.children || [], d => d.data.name);

        nodes.exit().remove();

        const enterNodes = nodes.enter()
            .append('div')
            .attr('class', 'nodeb')
            .text(d => {
                const prosentti = (d.value / node.value) * 100;
                const euroSumma = (prosentti / 100) * taxValue;
                return `${d.data.name}: €${euroSumma.toFixed(2)}`;
            });

        enterNodes.merge(nodes);
    }

    return (
        <div className="kuitti">
            <div ref={chartRef} id="chart"></div>
            <div id="verosumma">{vero}</div>
        </div>
    );
};

export default ShowVerokuitti;

