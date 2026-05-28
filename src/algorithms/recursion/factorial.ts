const code = `/**
 * Calculates factorial recursively.
 */
const factorial = (n) => {
  if(n === 0) return 1;

  return n * factorial(n - 1);
}
`;


async function execute(ctx, input) {
  console.log("Calling execute of factorial");
  /*
   * Function definition, it will emit the events for further proccess
   * */
  async function factorial(n) {
    ctx.emit({
      type: "call",
      line: 2,
      fn: "factorial",
      fnLabel: `factorial(${n})`,
      args: [n]
    });

    if(n === 0) {
      ctx.emit({
        type: "base_case",
        fnLabel: `factorial(0)`,
        line: 3,
        returnValue: 1
      });
      return 1;
    }

    const result = await factorial(n - 1);
    const finalValue = result * n;

    ctx.emit({
      type: "return",
      line: 5,
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
