import "./App.css";
import { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import Stack from "./components/Stack/Stack";
import Card from "./components/Card/Card";
import TimeLine from "./components/TimeLine/TimeLine"

import { factorialAlgorithm } from "./algorithms/recursion/factorial";
import { ExecutionEngine } from "./engine/ExecutionEngine";

export default function App() {
  const [items, setItems] = useState([]);
  
  const executionEngine = new ExecutionEngine();

  const nextStep = () => {
    console.log("Next step function");
  };

  const start = async () => {
    setItems([]); // limpiar stack
    
    const input = 3;
    const steps = await executionEngine.execute(factorialAlgorithm, input);

    console.log("Steps : ", steps);
  };
  

  return (
    <div className="min-h-screen min-w-full p-4 flex justify-center items-center bg-gray-200">
    <div className="flex flex-col md:flex-row w-full max-w-7xl gap-4">
      <div className="md:basis-2/3 flex flex-col gap-4">
      <div className="title">Choose algorithm</div>
        <CodeMirror
          value={factorialAlgorithm.code}
          height="500px"
          editable={false}
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => setValue(value)}
        />
        <div className="grid grid-flow-col grid-rows-2 gap-2">
          <TimeLine className="col-span-3"/>

          <div className="flex items-center justify-center col-span-1">
            <button onClick={start}>Prev</button>
          </div> 
          <div className="flex items-center justify-center col-span-1">
            <button onClick={start}>Run function</button>
          </div> 
          <div className="flex items-center justify-center col-span-1">
            <button onClick={start}>Next</button>
          </div> 
        </div>
      </div>
      <div className="md:basis-1/3 flex flex-col gap-4">
        <div className="title">Call Stack</div>
        <Stack
          items={items}
          // currentCard={currentCard}
          stackHeight={500}
          gap={10}
          renderCardItem={(item, currentCard) => <Card item={item} currentCard={currentCard}/>}
        />
      </div>
    </div>
    </div>
  );
}
