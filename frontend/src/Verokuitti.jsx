import { useState } from "react"
import ShowVerokuitti from "./ShowVerokuitti"
import './verokuitti.css'
const Verokuitti = () => {
    const [summa, setSumma] = useState('')
    const [clicked, setClicked] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        console.log(summa)
        setClicked(true)
        console.log(clicked)

    }
    return (
        <>
            {clicked ? (
                <ShowVerokuitti summa={summa}/>
            )
            
            : (
                <div className="kuitti-sivu-koko">
                    <div className="main-kuitti-card">

                    
                    <div className="ohje">Syötä alle kuukausitulosi niin lasketaan mitä hallitus rahoillasi tekee.</div>
                    <div className="kuitti-form-wrapper">

                    
                <form  className='kuitti-form' onSubmit={handleClick} >
                <label name="summa">Kuukausitulosi</label>
                <input type="number" id="summa" name="summa" required value={summa} onChange={(e) => setSumma(e.target.value) }/>
                <button className="kuitti-btn" type="submit">Tulosta kuitti</button>
                </form>
                </div>
                </div>
                </div>
            )}
            

    
        </>
        
    )
}

export default Verokuitti;