import './palaute.css'

const Feedback = () => {
    return (
       
  
  <div className="palaute-wrapper">
    <div className="palaute-wrapper-teksti">
      
    
      <h2>Anna palautetta</h2> 
      <div>Voit lähettää palautetta sivuistamme. Palautetta voi antaa sivujen toimivuudesta,
        saavutettavuudesta, sisällöstä tai muusta.
      </div>
    </div>


    <form action="/palaute" method="POST" >
      <fieldset>
        <legend>Palautelomake</legend>
       
        <div className="palautelaatikko">
        <span>* pakollinen tieto</span>
        <div>
          <label htmlFor="message">Palaute *</label>
          <textarea id="message" name="message" required></textarea>
        </div>
      <div>
        <label htmlFor="name">Nimi*</label>
        <input type="text"  id="name" name="name" required/>
      </div>
      <div>
        <label htmlFor="email">Sähköposti</label>
        <input type="email" id="email" name="email"/>
      </div>
     <div>
      <label htmlFor="organisaatio">Organisaatio</label>
      <input type="text" id="organisaatio" name="organisaatio"/>
     </div>
      
    </div>
    <button className="btn" type="submit">Lähetä</button>
    </fieldset>
    </form>
    
   </div>
  
  

    )
}

export default Feedback