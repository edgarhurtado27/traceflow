import "./Card.css";
import { Frame } from "../../engine/types";
import { Clock, Play, Undo2 } from "lucide-react";

interface CardProps {
  item: Frame;
}

const backgroundDictionary = {
  active: "active-bg",
  base_case: "bc-bg",
  returned: "returned-bg",
  waiting: "waiting-bg",
};

const textColorDictionary = {
  active: "active-tc",
  base_case: "bc-tc",
  returned: "returned-tc",
  waiting: "waiting-tc",
};

const iconsDictionary = {
  active: <Play className="text-slate-400"></Play>,
  base_case: <Play className="text-slate-400"></Play>,
  returned: <Undo2 className="text-slate-400"></Undo2>,
  waiting: <Clock className="text-slate-400"></Clock>,
};

export default function Card({ item }: CardProps) {
  const icon = iconsDictionary[item.status];

  const getDetails = (item: Frame) => {
    if (item.status == "waiting")
      return (
        <div className="flex flex-col">
          <div>Waiting for:</div>
          <div>{item.details}</div>
        </div>
      );
    if (item.status == "base_case" || item.status == "returned")
      return (
        <div className="flex flex-col">
          <div>Return: {item.returnValue}</div>
        </div>
      );


    return <></>;
  };

  return (
    <div
      className={`card flex flex-row gap-2 rounded rounded-l-2xl border-1 border-slate-300 justify-between ${backgroundDictionary[item.status]}`}
    >
      <div className="flex flex-1 items-center justify-center">
        {item.fn}
      </div>
      <div className="flex flex-1 items-center justify-center">
        {getDetails(item)}
      </div>
      <div
        className={`flex flex-1 gap-2 items-center justify-center uppercase text-sm font-bold ${textColorDictionary[item.status]}`}
      >
        {item.status} {icon}
      </div>
    </div>
  );
}
