export class ExecutionEngine {

  private steps = [];

  async execute(algorithm, input) {

    const ctx = {
      emit: this.emit.bind(this)
    };

    await algorithm.execute(ctx, input);

    return this.steps;
  }

  emit(event) {
    const { type, line, fn, fnLabel, returnValue } = event;

    // create snapshot
    const snapshot = {
      type, line, fn, fnLabel, returnValue
    }

    // push snapshot
    this.steps = [snapshot, ...this.steps];
  }
}
