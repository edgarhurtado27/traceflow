import { factorialAlgorithm } from "../algorithms/recursion/factorial";

// Eventos emitidos por los algoritmos
export type ExecutionEvent = {
  id: string;
  type: "call" | "return" | "base_case";
  line: number;
  fn: string;
  details: string;
  returnValue?: number;
  argument?: number;
};

// Frame que vive dentro del call stack
export type Frame = {
  id: string;
  fn: string;
  status: "active" | "returned" | "base_case" | "waiting";
  details: string;
  returnValue?: number;
};

// Snapshot completo de la ejecución
export type Snapshot = {
  seq: number;
  line: number;
  stack: Frame[];
};

// Contexto que recibe cada algoritmo
export type ExecutionContext = {
  emit: (event: ExecutionEvent) => void;
};

// Definición genérica de un algoritmo
export type AlgorithmDefinition = {
  id: string;
  title: string;
  category: string;
  visualizer: string;
  code: string;
  editorAlgorithmName: string;

  execute: (
    ctx: ExecutionContext,
    input: number 
  ) => Promise<unknown>;
};

export const algorithms: AlgorithmDefinition[] = [
  factorialAlgorithm,
];
