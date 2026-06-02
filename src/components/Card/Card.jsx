import "./Card.css";

export default function Card({ item }) {
  
  const backgroundDictionary = {
    'active': 'active-bg',
    'base_case': 'bc-bg',
    'returned': 'returned-bg',
    'waiting': 'waiting-bg'
  }

  return (<div className={`card  ${ backgroundDictionary[item.status]}`}>
    <div>{item.fnLabel}</div>
    <div>Status: {item.status}</div>
    <div>{!!item.returnValue ? "Returns: " + item.returnValue : ""}</div>
  </div>);
}
