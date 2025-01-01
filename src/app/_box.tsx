import { BoxValue, SetState } from "./page";

type BoxProps = {
  boxes: { [key: string]: BoxValue };
  gameOn: boolean;
  id: string;
  playerTracker: boolean;
  setBoxes: SetState<{ [key: string]: BoxValue }>;
  setPlayerTracker: SetState<boolean>;
  value: BoxValue;
  winningBoxes: string[] | null;
};

export function Box({
  boxes,
  gameOn,
  id,
  playerTracker,
  setBoxes,
  setPlayerTracker,
  value,
  winningBoxes,
}: BoxProps) {
  return (
    <button
      id={id}
      className={`grid aspect-square border-collapse place-items-center border-4 border-black px-4 text-center dark:border-white ${winningBoxes ? (winningBoxes.includes(id) ? "bg-teal-700" : "") : ""}`}
      onClick={() => {
        if (gameOn)
          if (!boxes[id]) {
            setBoxes({ ...boxes, [id]: getCurrentPlayer(playerTracker) });

            setPlayerTracker(!playerTracker);
          }
      }}
    >
      <span className="text-4xl">{value ?? ""}</span>
    </button>
  );
}

function getCurrentPlayer(tracker: boolean) {
  return tracker ? "X" : "O";
}
