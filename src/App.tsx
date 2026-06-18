import "./App.css";

import { Fragment, useState, useRef } from "react";
import { Listbox } from "@headlessui/react";
import {
  Check,
  ChevronDown,
  Layers,
  Play,
  StepBack,
  StepForward,
} from "lucide-react";

import Editor from "./components/Editor/Editor";
import Card from "./components/Card/Card";
import Stack from "./components/Stack/Stack";
import TimeLine from "./components/TimeLine/TimeLine";

import { ExecutionEngine } from "./engine/ExecutionEngine";

import {
  Snapshot,
  AlgorithmDefinition,
  algorithms,
  Frame,
} from "./engine/types";
import { EditorView } from "@uiw/react-codemirror";

const algorithmDictionary = Object.fromEntries(
  algorithms.map((alg) => [alg.id, alg]),
) as Record<string, AlgorithmDefinition>;

export default function App() {
  const [items, setItems] = useState<Snapshot[]>([]);
  const [snapShot, setSnapshot] = useState<Snapshot | null>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

  const executionEngine = new ExecutionEngine();

  const algorithm: AlgorithmDefinition = algorithmDictionary[selectedAlgorithm];

  const executeFunction = async () => {
    const input = 3;
    const snapshots = await executionEngine.execute(algorithm, input);

    setItems(snapshots);
    setSnapshot(snapshots[0]);
  };

  const nextSnapshot = () => {
    if (!snapShot) return;
    updateSnapshot(snapShot.seq + 1);
  };

  const prevSnapshot = () => {
    if (!snapShot) return;
    updateSnapshot(snapShot.seq - 1);
  };

  const updateSnapshot = (newSnapshotIndex: number) => {
    if (!items) return;
    const newSnapshot = items[newSnapshotIndex];
    setSnapshot(newSnapshot);
    highlightCurrentLine(newSnapshot.line);
  };

  const highlightCurrentLine = (snapShotLine: number) => {
    if (!editorViewRef || !editorViewRef.current) return;

    const line = editorViewRef.current.state.doc.line(snapShotLine);
    editorViewRef.current.dispatch({
      selection: {
        anchor: line.from,
      },
      scrollIntoView: true,
    });
  };

  const nextButtonDisabled =
    snapShot == null || snapShot.seq >= items!.length - 1;
  const prevButtonDisabled = snapShot == null || snapShot.seq == 0;
  const executeButtonDiabled = algorithm == null;

  const changeAlgorithm = (selectedAlgorithm: AlgorithmDefinition) => {
    console.log("invocado", selectedAlgorithm);
    if (selectedAlgorithm !== undefined) {
      setSelectedAlgorithm(selectedAlgorithm.id);
    }
  };

  return (
    <div className="min-h-screen min-w-full p-4 flex justify-center items-center bg-gray-200 font-sans flex flex-col gap-5">
      <div className="flex flex-col md:flex-row w-full max-w-7xl gap-4">
        <div className="md:basis-1/2 flex flex-col gap-4">
          <Listbox value={selectedAlgorithm} onChange={changeAlgorithm}>
            <div className="relative">
              <Listbox.Button
                className="
              h-14
              w-full
    max-w-1/2
    rounded-xl
    border
    border-slate-300
    bg-white
    px-4
            "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Algoritmo</p>

                    <p className="text-sm font-medium">{algorithm?.title}</p>
                  </div>

                  <ChevronDown className="text-slate-500" />
                </div>
              </Listbox.Button>

              <Listbox.Options
                className="
              absolute
              z-50
              mt-2
              w-full
    max-w-1/2
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-xl
              focus:outline-none
            "
              >
                {Object.entries(algorithmDictionary).map(([key, algorithm]) => (
                  <Listbox.Option
                    key={algorithm.id}
                    value={algorithm}
                    as={Fragment}
                  >
                    {({ active, selected }) => (
                      <li
                        className={`
                      flex
                      cursor-pointer
                      items-center
                      justify-between
                      px-4
                      py-3
                      transition

                      ${active ? "bg-slate-100" : "bg-white"}
                    `}
                      >
                        <span
                          className={selected ? "font-semibold" : "font-medium"}
                        >
                          {algorithm.title}
                        </span>

                        {selected && (
                          <Check size={16} className="text-blue-500" />
                        )}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
          <Editor
            editorViewRef={editorViewRef}
            code={algorithm?.code}
            fileName={algorithm?.editorAlgorithmName}
          />
        </div>
        <div className="md:basis-1/2 flex flex-col gap-4">
          <div className="flex items-center gap-2 h-14">
            <Layers />
            <h2 className="text-lg">Call Stack</h2>
          </div>
          <Stack
            snapshot={snapShot}
            stackHeight={500}
            gap={10}
            renderCardItem={(item: Frame) => <Card item={item} />}
          />
        </div>

      </div>


        <div className="grid grid-flow-col grid-rows-2 gap-2 w-full max-w-7xl">
          <TimeLine
            snapshots={items}
            indexCurrentSnapshot={snapShot?.seq}
            className="col-span-3"
          />

          <div className="flex items-center justify-center col-span-1">
            <button
              disabled={prevButtonDisabled}
              onClick={prevSnapshot}
              className="h-10 w-10 bg-blue-500 hover:bg-blue-700 rounded-full flex items-center justify-center text-white enabled:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <StepBack />
            </button>
          </div>
          <div className="flex items-center justify-center col-span-1">
            <button
              disabled={executeButtonDiabled}
              onClick={executeFunction}
              className="h-10 w-10 bg-blue-500 hover:bg-blue-700 rounded-full flex items-center justify-center text-white enabled:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play />
            </button>
          </div>
          <div className="flex items-center justify-center col-span-1">
            <button
              disabled={nextButtonDisabled}
              onClick={nextSnapshot}
              className="h-10 w-10 bg-blue-500 hover:bg-blue-700 rounded-full flex items-center justify-center text-white enabled:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <StepForward />
            </button>
          </div>

      </div>


    </div>
  );
}
