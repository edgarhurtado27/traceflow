import { animate } from "animejs";
import { useEffect, useRef, useLayoutEffect, useState } from "react";

import "./Stack.css";
import { Snapshot, Frame } from "../../engine/types";

interface StackProps {
  snapshot: Snapshot | null;
  renderCardItem: any;
  stackHeight: number;
  gap: number;
}
export default function Stack({
  snapshot,
  renderCardItem,
  stackHeight = 500,
  gap = 10,
}: StackProps) {
  const refs = useRef(new Map());
  const elementRef = useRef(null);
  const [height, setHeight] = useState(0);

  const STACK_PADDING = 10;

  const items: Frame[] = snapshot?.stack || [];
  const availableHeight = height - STACK_PADDING * 2;
  console.log("height:", height);

  const cardHeight =
    items.length > 0
      ? Math.max(
          50,
          (availableHeight - gap * (items.length - 1)) / items.length,
        )
      : stackHeight;

  useEffect(() => {
    if (!refs.current.size) return;

    const elements = items
      .map((item) => refs.current.get(item.id))
      .filter(Boolean);

    animate(elements, {
      translateY: (_, i) => i * (cardHeight + gap),
      scale: [0.95, 1],
      duration: 400,
      ease: "outBack",
    });
  }, [items, cardHeight, gap]);

  useLayoutEffect(() => {
    if (elementRef.current) {
      const timer = setTimeout(() => {
        setHeight(elementRef.current.offsetHeight);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <div className="border-1 border-b-0 h-12 border-slate-300  bg-white rounded-t-lg  flex gap-2 px-4 flex-row items-center justify-between">
        <div className="flex flex-1 justify-center">Function</div>
        <div className="flex flex-1 justify-center">Details</div>
        <div className="flex flex-1 justify-center">State</div>
      </div>
      <div
        ref={elementRef}
        className="stack relative flex-1 border-1 border-slate-300 rounded-b-lg bg-white"
      >
        {/*flex-1 need to grow up automatically the stack*/}
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) {
                refs.current.set(item.id, el);
              } else {
                refs.current.delete(item.id);
              }
            }}
            className="stack-item"
            style={{
              height: `${cardHeight}px`,
            }}
          >
            {renderCardItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
