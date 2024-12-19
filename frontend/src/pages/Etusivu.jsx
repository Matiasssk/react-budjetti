import { useNavigate } from "react-router-dom";

import "./etusivu.css";

const Etusivu = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/budjetti");
  };
  return (
    <div className="etusivu">
      <div className="main-card">
        <div className="main-card-teksti">
          <p>
            Valtiovarainministeriön tutkibudjettia-sivusto on ollut poissa
            käytöstä jo hetken, joten täytyi laittaa pystyyn jonkinlainen
            korvike kyseiselle sivulle. Budjettikirjan tutkiminen on hieman
            hankalaa, ja sen avulla voi olla vaikea saada tarkkaa käsitystä
            siitä, mihin valtion rahat oikein menevät. Tällä sivustolla voit
            tutkia visuaalisessa muodossa vuoden 2025 valtion budjettia.
          </p>
          <p>
            Valtion menot miljardeineen voivat tuntua visuaalisessa muodossakin
            etäisiltä, joten verokuittiosiossa voit tarkastella, mihin juuri
            sinun maksamasi verot käytetään. Mitä kaikkea sinun maksamillasi
            verorahoillasi hallitus ostaa. Idea verokuitista on varastettu
            hienosta verokuitti-sivustosta, joka oli olemassa joitakin vuosia
            sitten.
          </p>
          <p>
            Budjetin tarkasteluun käytettävä data tulee valtiovarainministeriön
            sivuilta, mistä se on saatavilla koneluettavassa muodossa, vaikkakin
            hieman kömpelösti. Harmi että kaikkia julkisen hallinnon menoja ei
            ole saatavilla vapaasti ja helposti avoimen rajapinnan kautta. Jos
            datassa jotain virheitä sattuisi kuitenkin löytymään, on virhe
            tapahtunut luultavasti koodissa. Laita mieluusti siinä tapauksessa
            palautetta.
          </p>
          <p>
            Ja mikäs se valtion budjetti olikaan? Valtiovarainministeriön kuvaus
            asiasta on seuraavanlainen: &quot;Valtion budjetti eli talousarvio
            on vuosittainen valtion taloutta ja varainhoitoa koskeva
            suunnitelma, jossa päätetään budjettitalouden meno- ja tuloarvioista
            ja tarvittaessa alijäämän kattamiseen otettavasta velasta.&quot;
            Suomeksi sanottuna siinä siis on valtion tulot ja menot seuraavalle
            vuodelle.
          </p>
        </div>

        <button className="etusivu-btn" onClick={handleClick}>
          Siirry tarkastelemaan budjettia
        </button>
      </div>
    </div>
  );
};

export default Etusivu;
