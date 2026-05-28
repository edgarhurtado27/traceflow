import "./Card.css";

export default function Card({ item, currentCard }) {
  return (<div className={`card ${item.id == currentCard ? 'current' : ''}`}>
    <div>{item.isBC ? "Base case: " : "Call: "}{item.expression}</div>
    <div>Status: {item.status}</div>
    <div>{!!item.returnValue ? "Returns: " + item.returnValue : ""}</div>
  </div>);
}
