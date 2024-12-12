import { useNavigate } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate("/palaute");  // Tämä vie käyttäjän /palaute-sivulle
    }


    return (
        <footer>
        <div>Valtion Budjetti vuodelle 2025. Lisätietoa budjetista löytyy osoitteesta
          <a href="https://budjetti.vm.fi/index.jsp" target="_blank">budjetti.vm.fi</a></div>
          <button  onClick={handleNavigate} className="palaute-btn">Anna palautetta</button>
      </footer>
    )
}

export default Footer;