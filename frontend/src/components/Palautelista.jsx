import { useEffect, useState } from "react";
import feedbackService from "../services/feedbackService";
import Palaute from "./Palaute";
import "../pages/login.css";

const Palautelista = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    feedbackService
      .getAllFeedback()
      .then((initialFeedbacks) => {
        console.log(initialFeedbacks);
        setFeedback(initialFeedbacks);
      })
      .catch((error) => {
        console.error("virhe palautteiden hakemisessa", error);
      });
  }, []);

  return (
    <div className="feedback-wrapper">
      <div className="feedback-card">
        <ul className="feedback-ul">
          {feedback.map((item) => (
            <Palaute key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Palautelista;
