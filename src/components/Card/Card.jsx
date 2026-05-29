import "./Card.css";

export default function Card({ item }) {
  return (<div className={`card ${item.fn == '1234 '? 'current' : ''}`}>
    <div>{item.fnLabel}</div>
    <div>Status: {item.type}</div>
    <div>{!!item.returnValue ? "Returns: " + item.returnValue : ""}</div>
  </div>);
}
