import {
  AlgorithmDefinition,
  ExecutionContext,
  ExecutionEvent,
} from "../../engine/types";

const code = `/**
 * Calculates factorial recursively.
 */
const factorial = (n) => {
  if(n === 0) return 1;

  return n * factorial(n - 1);
}
`;

async function execute(ctx: ExecutionContext, input: number) {
  /*
   * Function definition, it will emit the events for further proccess
   * */
  async function factorial(n: number): Promise<number> {
    const label = n > 0 ? `${n} * factorial(${n - 1})` : 'factorial(0)';

    const callEvent: ExecutionEvent = {
      id: crypto.randomUUID(),
      type: "call",
      line: 4,
      fn: "factorial",
      fnLabel: label,
      argument: n,
    };
    ctx.emit(callEvent);

    if (n === 0) {
      const baseCaseEvent: ExecutionEvent = {
        id: crypto.randomUUID(),
        type: "base_case",
        line: 5,
        fn: "factorial",
        fnLabel: `factorial(0)`,
        argument: 0,
      };
      ctx.emit(baseCaseEvent);
      return 1;
    }

    const result = await factorial(n - 1);
    const finalValue = result * n;

    const returnEvent: ExecutionEvent = {
      id: crypto.randomUUID(),
      type: "return",
      line: 7,
      fn: "factorial",
      fnLabel: `factorial(${n})`,
      returnValue: finalValue,
      argument: n,
    };

    ctx.emit(returnEvent);

    return finalValue;
  }

  return factorial(input);
}

export const factorialAlgorithm: AlgorithmDefinition = {
  id: "factorial",
  title: "Factorial",
  category: "recursion",
  visualizer: "recursion",
  editorAlgorithmName: "factorial.js",
  code,
  execute,
};
