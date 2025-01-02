import {
  switchPlayer,
  type Boxes,
  type BoxID,
  type BoxValue,
  type Player,
  type SetState,
} from "./_board";

type BoxProps = {
  boxes: Boxes;
  gameOn: boolean;
  id: BoxID;
  playerTracker: Player;
  setBoxes: SetState<Boxes>;
  setPlayerTracker: SetState<Player>;
  value: BoxValue;
  winningBoxes: BoxID[] | null;
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
          if (!boxes[id as BoxID]) {
            setBoxes({ ...boxes, [id]: playerTracker });

            setPlayerTracker(switchPlayer(playerTracker));
          }
      }}
    >
      <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        {value}
      </span>
    </button>
  );
}
