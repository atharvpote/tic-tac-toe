"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box } from "./_box";

export type BoxID = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type BoxValue = "X" | "O" | null;
export type Boxes = { [key in BoxID]: BoxValue };
export type Player = "X" | "O";
export type PlayerMode = "1P" | "2P";

export function Board() {
  const [gameOn, setGameOn] = useState<boolean>(true);
  const [boxes, setBoxes] = useState<Boxes>({
    "1": null,
    "2": null,
    "3": null,
    "4": null,
    "5": null,
    "6": null,
    "7": null,
    "8": null,
    "9": null,
  });
  const [winningBoxes, setWinningBoxes] = useState<BoxID[] | null>(null);
  const [playerTracker, setPlayerTracker] = useState<Player>("X");
  const [gameMode] = useState<PlayerMode>("1P");

  useEffect(
    function findWinner() {
      const winningPatterns: BoxID[][] = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["3", "6", "9"],
        ["1", "5", "9"],
        ["3", "5", "7"],
      ];

      isGameWon(boxes, setGameOn, setWinningBoxes, winningPatterns);
    },
    [boxes],
  );

  useEffect(
    function cpuPlayer() {
      if (gameMode === "1P") {
        if (playerTracker === "O") {
          const emptyBoxes = Object.entries(boxes).filter(
            ([, value]) => value === null,
          );

          if (emptyBoxes.length) {
            const [randomEmptyBoxId] =
              emptyBoxes[Math.floor(Math.random() * (emptyBoxes.length - 1))];

            setBoxes({ ...boxes, [randomEmptyBoxId]: "O" });

            setPlayerTracker(switchPlayer(playerTracker));
          }
        }
      }
    },
    [boxes, gameMode, playerTracker],
  );

  return (
    <div className="mx-auto grid aspect-square max-w-xl grid-cols-3 border-4 border-black dark:border-white">
      {Object.entries(boxes).map(([key, value]) => (
        <Box
          boxes={boxes}
          gameOn={gameOn}
          id={key as BoxID}
          key={key}
          playerTracker={playerTracker}
          setBoxes={setBoxes}
          setPlayerTracker={setPlayerTracker}
          value={value}
          winningBoxes={winningBoxes}
        />
      ))}
    </div>
  );
}

export type SetState<T> = Dispatch<SetStateAction<T>>;

function isGameWon(
  boxes: Boxes,
  setGameOn: SetState<boolean>,
  setWinningBoxes: SetState<BoxID[] | null>,
  winningPatterns: BoxID[][],
) {
  const markedWinningPattern = getMarkedWinningPattern(boxes, winningPatterns);

  if (markedWinningPattern) {
    setWinningBoxes(markedWinningPattern);
    setGameOn(false);
  }
}

function getMarkedWinningPattern(boxes: Boxes, winningPatterns: BoxID[][]) {
  for (const pattern of winningPatterns)
    if (
      pattern.every((box) => boxes[box] === "X") ||
      pattern.every((box) => boxes[box] === "O")
    )
      return pattern;

  return null;
}

export function switchPlayer(tracker: Player) {
  return tracker === "O" ? "X" : "O";
}
