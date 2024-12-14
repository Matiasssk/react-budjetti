const Palaute = ({ item }) => {
  return (
    <li className="feedback-li">
      <div className="li-content">{item.content}</div>
      <div className="li-extras">
        <div>lähettäjä: {item.name}</div>
        <div>organisaatio: {item.organisaatio}</div>
        <div>email: {item.email}</div>
        <div>aikaleima: {item.createdAt}</div>
      </div>
    </li>
  );
};
export default Palaute;
