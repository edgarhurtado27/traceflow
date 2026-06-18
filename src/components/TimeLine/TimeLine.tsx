import { Snapshot } from "../../engine/types";

interface TimeLineProps {
  className: string;
  snapshots: Snapshot[];
  indexCurrentSnapshot: number;
}

export default function Timeline({
  className,
  snapshots,
  indexCurrentSnapshot,
}: TimeLineProps) {
  const progress =
    snapshots.length <= 1
      ? 0
      : (indexCurrentSnapshot / (snapshots.length - 1)) * 100;

  return (
    <div
      className={`${className} relative flex items-center justify-between text-xs`}
    >
      <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-gray-300" />

      {/* Línea azul */}
      <div
        className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-blue-500 transition-all duration-100"
        style={{
          width: `${progress}%`,
        }}
      />

      {snapshots.length > 0 &&
        snapshots.map((snapshot) => (
          <div
            key={snapshot.seq}
            className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full text-white ${snapshot.seq <= indexCurrentSnapshot ? "bg-blue-500" : "bg-gray-300 text-black"} transition-all duration-300`}
          >
            {snapshot.seq + 1}
          </div>
        ))}
    </div>
  );
}
