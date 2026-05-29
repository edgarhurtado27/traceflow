import { events } from "animejs";

export class ExecutionEngine {

  private events = [];

  async execute(algorithm, input) {

    const ctx = {
      emit: this.emit.bind(this)
    };

    await algorithm.execute(ctx, input);

    return this.events;
  }

  emit(event) {
    const { id, type, line, fn, fnLabel, returnValue } = event;
    const seq = this.events.length;

    // create snapshot
    const snapshot = {
      seq,
      id, type, line, fn, fnLabel, returnValue
    }
    console.log("new Snapshot : ", snapshot )

    // push snapshot
    this.events = [...this.events, snapshot];
  }
}
