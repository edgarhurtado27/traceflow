import "./App.css";

import { Fragment, useState, useRef } from "react";
import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

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
    <div className="min-h-screen min-w-full p-4 flex justify-center items-center bg-gray-200 font-sans">
      <div className="flex flex-col md:flex-row w-full max-w-7xl gap-4">
        <div className="md:basis-2/3 flex flex-col gap-4">
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
          <Editor editorViewRef={editorViewRef} code={algorithm?.code} />

          <div className="grid grid-flow-col grid-rows-2 gap-2">
            <TimeLine snapshots={items} indexCurrentSnapshot={snapShot?.seq} className="col-span-3" />

            <div className="flex items-center justify-center col-span-1">
              <button
                disabled={prevButtonDisabled}
                onClick={prevSnapshot}
                className="h-10 w-10 bg-blue-500 hover:bg-blue-700 rounded-full flex items-center justify-center text-white enabled:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-center col-span-1">
              <button
                disabled={executeButtonDiabled}
                onClick={executeFunction}
                className="h-10 w-10 bg-blue-500 hover:bg-blue-700 rounded-full flex items-center justify-center text-white enabled:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="h-10 w-10 bg-blue-500 hover:bg-blue-700 rounded-full flex items-center justify-center text-white enabled:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 21 24"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="md:basis-1/3 flex flex-col gap-4">
          <div className="flex items-center gap-2 h-14">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
              />
            </svg>
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
    </div>
  );
}
