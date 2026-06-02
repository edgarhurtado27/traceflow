import { Snapshot } from "../../engine/types"

interface TimeLineProps {
  className: string,
  snapshots: Snapshot[],
}

export default function Timeline({className, snapshots}: TimeLineProps) {

  return (
      <div className={`${className} relative flex items-center justify-between text-xs`}>

        <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-gray-300" />

        {snapshots.length > 0 && snapshots.map((snapshot) => (
          <div
            key={snapshot.seq}
            className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white"
          >
            {snapshot.seq + 1}
          </div>
        ))}
      </div>
  )
}
