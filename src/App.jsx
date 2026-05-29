import "./App.css";
import { useState, useRef } from "react";
import { EditorView } from "@codemirror/view";

import Editor from "./components/Editor/Editor";
import Card from "./components/Card/Card";
import Stack from "./components/Stack/Stack";
import TimeLine from "./components/TimeLine/TimeLine"

import { factorialAlgorithm } from "./algorithms/recursion/factorial";
import { ExecutionEngine } from "./engine/ExecutionEngine";

export default function App() {
  const [items, setItems] = useState([]);
  const [snapShot, setSnapshot] = useState();
  const editorViewRef = useRef(null);
  
  const executionEngine = new ExecutionEngine();
  const executeFunction = async () => {
    setItems([]);
    
    const input = 3;
    const snapshots = await executionEngine.execute(factorialAlgorithm, input);
    setItems(snapshots);
    setSnapshot(snapshots[0]);
  };

  const nextSnapshot = () => {
    const newSnapshotIndex = snapShot.seq + 1;
    const newSnapshot = items[newSnapshotIndex];
    setSnapshot(newSnapshot);

    const line = editorViewRef.current.state.doc.line(newSnapshot.line);
    editorViewRef.current.dispatch({
      selection: {
        anchor: line.from
      },
      scrollIntoView: true
    });
  }

  const prevSnapshot = () => setSnapshot(currentStep -1);


  const itemsToRender = items.length > 0 ? items.slice(0, snapShot.seq + 1) : [];
  if(snapShot != null)
  {

    console.log("newS ", snapShot.seq);
  }
  const nextButtonDisabled = snapShot == null || snapShot.seq >= items.length -1
    console.log("disables ", nextButtonDisabled);

  return (
    <div className="min-h-screen min-w-full p-4 flex justify-center items-center bg-gray-200">
    <div className="flex flex-col md:flex-row w-full max-w-7xl gap-4">
      <div className="md:basis-2/3 flex flex-col gap-4">
      <div className="title">Choose algorithm</div>

      <Editor editorViewRef={editorViewRef} code={factorialAlgorithm.code}/>
    
        <div className="grid grid-flow-col grid-rows-2 gap-2">
          <TimeLine snapshots={items} snapShot={snapShot} className="col-span-3"/>

          <div className="flex items-center justify-center col-span-1">


<button
  onClick={prevSnapshot}
  className="h-10 w-10 bg-blue-500 hover:bg-blue-700 rounded-full flex items-center justify-center text-white"
>


<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
</svg>

</button>
    

          </div> 
          <div className="flex items-center justify-center col-span-1">

<button
  onClick={executeFunction}
  className="h-10 w-10 bg-blue-500 hover:bg-blue-700 rounded-full flex items-center justify-center text-white"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 24"
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
    />
  </svg>
</button>
    

          </div> 
          <div className="flex items-center justify-center col-span-1">


<button
  disabled={nextButtonDisabled}
  onClick={nextSnapshot}
  className="h-10 w-10 bg-blue-500 hover:bg-blue-700 rounded-full flex items-center justify-center text-white"
>


<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 24" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
</svg>

</button>
    

        </div>
        </div>
      </div>
      <div className="md:basis-1/3 flex flex-col gap-4">
        <div className="title">Call Stack</div>
        <Stack
          items={itemsToRender.reverse()}
          stackHeight={500}
          gap={10}
          renderCardItem={(item) => <Card item={item} />}
        />
      </div>
    </div>
    </div>
  );
}
