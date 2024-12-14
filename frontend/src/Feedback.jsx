import { useState, useEffect } from "react";
import "./palaute.css";
import feedbackService from "./services/feedbackService";

const Feedback = () => {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisaatio, setOrganisaatio] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const addNewFeedback = (newFeedback) => {
    feedbackService
      .addFeedback(newFeedback)
      .then((response) => {
        setContent("");
        setName("");
        setOrganisaatio("");
        setEmail("");
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage("Jotain meni väärin");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(content, name, email, organisaatio);
    const newFeedback = {
      content: content,
      name: name,
      email: email,
      organisaatio: organisaatio,
    };
    addNewFeedback(newFeedback);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="palaute-wrapper">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && (
        <div className="success-message">
          <h3>Kiitos Paljosti Palautteesta!</h3>
          <div>
            Ja kivaa päivää sinulle. Toivottavasti olet hyvässä paikassa
            elämässäsi.
          </div>
        </div>
      )}
      <div className="palaute-wrapper-teksti">
        <h2>Anna palautetta</h2>
        <div>
          <p>
            Voit lähettää palautetta sivuista. Palautetta voi antaa sivujen
            toimivuudesta, saavutettavuudesta, sisällöstä tai muusta.
          </p>
          <p>
            Tai jos haluat palkata yritykseesi aloittelevan web-ohjelmoijan,
            joka on kiinnostunut datan visualisoinnista ja erityisesti
            yhteiskunnallisista aiheista niin ota hetimiten yhteyttä. Etenkin
            jos satut etsimään VMlle tai valtiolle työntekijää, niin olen valmis
            viipeettä tulemaan töihin oppimaan!
          </p>
        </div>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Palautelomake</legend>

          <div className="palautelaatikko">
            <span>* pakollinen tieto</span>
            <div>
              <label htmlFor="message">Palaute *</label>
              <textarea
                id="message"
                name="message"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="name">Nimi*</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Sähköposti</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="organisaatio">Organisaatio</label>
              <input
                type="text"
                id="organisaatio"
                name="organisaatio"
                value={organisaatio}
                onChange={(e) => setOrganisaatio(e.target.value)}
              />
            </div>
          </div>
          <div className="btn-flex">
            <button className="btn" type="submit">
              Lähetä
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Feedback;
