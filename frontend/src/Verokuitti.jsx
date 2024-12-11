import { useState } from "react"
import ShowVerokuitti from "./ShowVerokuitti"

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
                <>
                <form  onSubmit={handleClick} >
                <label name="summa">Kuukausitulot</label>
                <input type="number" id="summa" name="summa" required value={summa} onChange={(e) => setSumma(e.target.value) }/>
                <button type="submit">Näytä</button>
                </form>
                </>
            )}
            

    
        </>
        
    )
}

export default Verokuitti;