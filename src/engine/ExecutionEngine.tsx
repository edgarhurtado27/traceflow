import { ExecutionEvent, Frame, Snapshot, AlgorithmDefinition, ExecutionContext } from "./types";

export class ExecutionEngine {

  // private events: ExecutionEvent[] = [];

  private stack: Frame[] = [];

  private snapshots: Snapshot[] = [];

  async execute(
    algorithm: AlgorithmDefinition,
    input: number 
  ): Promise<Snapshot[]> {

    const ctx: ExecutionContext = {
      emit: this.emit.bind(this)
    };

    await algorithm.execute(ctx, input);

    return this.snapshots;
  }

  emit(event: ExecutionEvent): void {
    const {id, fn, fnLabel, type, line, returnValue} = event;

    const frame: Frame = {
      id, fn, fnLabel, status: "active"
    }

    const stackCopy = structuredClone(this.stack);
    switch(type)
    {
      case "call":
        
        // for(let i = 0; i < this.stack.length; i++)
        // {
        //   stackCopy[i].status = "pending";
        // }
        this.markEventesWaiting(stackCopy);

        this.stack.push(frame);
        stackCopy.push(frame);

        const snapshotC: Snapshot = {
          seq: this.snapshots.length,
          line,
          stack: stackCopy,
        } 

        this.snapshots.push(snapshotC);
        break;
      case "return":
        // for(let i = 0; i < this.stack.length; i++)
        // {
        //   stackCopy[i].status = "pending";
        // }
        this.markEventesWaiting(stackCopy);
        this.stack.pop()

        stackCopy[stackCopy.length - 1].returnValue = returnValue;
        stackCopy[stackCopy.length - 1].status = "returned";
        const snapshotR: Snapshot = {
          seq: this.snapshots.length,
          line,
          stack: stackCopy 
        }
        this.snapshots.push(snapshotR);

        break;
      case "base_case":
        this.markEventesWaiting(stackCopy);
        this.stack.pop();

        stackCopy[stackCopy.length -1].returnValue = returnValue;
        stackCopy[stackCopy.length -1].status = "base_case";

        const snapshotB: Snapshot = {
          seq: this.snapshots.length,
          line,
          stack: stackCopy
        } 

        this.snapshots.push(snapshotB);
        break;
    }
  }

  markEventesWaiting(stackCopy : Frame[]): void{
    for(let i = 0; i < this.stack.length; i++)
    {
      stackCopy[i].status = "waiting";
    }
  }
}
