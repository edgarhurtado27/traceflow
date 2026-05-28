import "./App.css";
import { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import Stack from "./components/Stack/Stack";
import Card from "./components/Card/Card";

export default function App() {
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(0);
  const resolverRef = useRef(null);
  const [currentCard, setCurrentCard] = useState();



  const [value, setValue] = useState(`const factorial = (n)=>{ 
  if(n == 0) return 1;

  return n * factorial(n-1);
}`);

  const pushItem = (logF) => {
    const { id } = logF;
    setCurrentCard(id);
    setItems((prev) => [logF, ...prev]);
    setCounter((prev) => prev + 1);
  };

  const updateFrame = (id, updates) => {
    setCurrentCard(id);
    setItems((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const waitForNextStep = () => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
    });
  };

  const nextStep = () => {
    if (resolverRef.current) {
      resolverRef.current();
      resolverRef.current = null;
    }
  };

  const factorial = async (n, pushItem, updateFrame, waitForNextStep) => {
    // 1. Create initial card 
    const cardId = crypto.randomUUID();

    // 2. Case Base
    if (n == 0) {
      const itemDetail = { 
        id: cardId,
        n,
        expression: "factorial(0)",
        returnValue: 1,
        status: "returning",
        isBC: true,
      }

      // 2.1 Insert itemDetail on stack
      pushItem(itemDetail);

      await waitForNextStep();
      updateFrame(cardId, { status: "done", returnValue: 1});
      return 1;
    }

    const itemDetail = { 
      id: cardId,
      n,
      expression: `${n} * factorial(${n - 1})`,
      returnValue: null,
      status: "pending"
    }

    // 3. Insert itemDetail on stack
    pushItem(itemDetail);

    // 4. Pause execution
    await waitForNextStep();

    const result = await factorial(n - 1, pushItem, updateFrame, waitForNextStep);
    const valueToReturn = result * n;

    updateFrame(cardId, {status: "done", returnValue: valueToReturn});
    await waitForNextStep();

    return n * result;
  };

  const start = async () => {
    setItems([]); // limpiar stack
    await factorial(4, pushItem, updateFrame, waitForNextStep);
  };
  

  return (
    <div className="container">
      <div className="textEditor">
      <div className="title">Choose algorithm</div>
        <CodeMirror
          value={value}
          height="500px"
          editable={false}
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => setValue(value)}
        />
        <div className="actions">
          {/**
           * 
           <button onClick={pushItem}>Add</button>
           <button onClick={popItem}>Remove</button>
           * 
           */}
           <button onClick={start}>Run function</button>
          <button onClick={nextStep}>Next Step</button>
        </div>
      </div>
      <div className="stackWrapper">
        <div className="title">Call Stack</div>
        <Stack
          items={items}
          currentCard={currentCard}
          stackHeight={500}
          gap={10}
          renderCardItem={(item, currentCard) => <Card item={item} currentCard={currentCard}/>}
        />
      </div>
    </div>
  );
}
