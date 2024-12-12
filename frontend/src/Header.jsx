import { useNavigate } from 'react-router-dom';

import './header.css';

const Header = () => {
    const navigate = useNavigate()
    const handleClick = (e) => {
        console.log('click', e.target.value)
        navigate(`/${e.target.value}`);
    }
    return (
        <>
          <div className="main-header">
            <div className='header-text-wrapper'>
            <h1>valtion budjetti 2025</h1>
             <ul className='nav-ul'>
            <li>
                <button className='header-btn' onClick={(e) => handleClick(e)} value=''>Etusivu</button>
            </li>
            <li>
                <button className='header-btn' onClick={(e) => handleClick(e)} value='budjetti'>Budjetti</button>
            </li>
            <li>
                <button className='header-btn' onClick={(e) => handleClick(e)} value='verokuitti'>Verokuitti</button>
            </li>
            </ul>
            </div>
 
      
           
        </div>
       
        </>
      
    )
}

export default Header;