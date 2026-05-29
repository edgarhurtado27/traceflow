const code = `/**
 * Calculates factorial recursively.
 */
const factorial = (n) => {
  if(n === 0) return 1;

  return n * factorial(n - 1);
}
`;


async function execute(ctx, input) {
  /*
   * Function definition, it will emit the events for further proccess
   * */
  async function factorial(n) {
    ctx.emit({
      id: crypto.randomUUID(),
      type: "call",
      line: 4,
      fn: "factorial",
      fnLabel: `factorial(${n})`,
      args: [n]
    });

    if(n === 0) {
      ctx.emit({
        id: crypto.randomUUID(),
        type: "base_case",
        fnLabel: `factorial(0)`,
        line: 5,
        returnValue: 1
      });
      return 1;
    }

    const result = await factorial(n - 1);
    const finalValue = result * n;

    ctx.emit({
      id: crypto.randomUUID(),
      type: "return",
      line: 7,
      fn: "factorial",
      fnLabel: `factorial(${n})`,
      args: [n],
      returnValue: finalValue
    });

    return finalValue;
  }

  return factorial(input);
}

export const factorialAlgorithm = {
  id: "factorial",
  title: "Factorial",
  category: "recursion",
  visualizer: "recursion",
  code,
  execute
}
