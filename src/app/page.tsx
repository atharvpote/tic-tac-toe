"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box } from "./_box";

export type BoxValue = "X" | "O" | null;

export default function Home() {
  const [gameOn, setGameOn] = useState<boolean>(true);
  const [boxes, setBoxes] = useState<{ [key: string]: BoxValue }>({
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
  const [winningBoxes, setWinningBoxes] = useState<string[] | null>(null);
  const [playerTracker, setPlayerTracker] = useState<boolean>(true);

  useEffect(() => {
    isGameWon(boxes, setGameOn, setWinningBoxes);
  }, [boxes]);

  return (
    <main>
      <header className="py-12">
        <h1 className="text-center text-4xl font-bold">Tic Tac Toe</h1>
      </header>
      <div className="px-4">
        <div className="mx-auto grid aspect-square max-w-xl grid-cols-3 border-4 border-black dark:border-white">
          {Object.entries(boxes).map(([key, value]) => (
            <Box
              key={key}
              boxes={boxes}
              gameOn={gameOn}
              id={key}
              playerTracker={playerTracker}
              setBoxes={setBoxes}
              setPlayerTracker={setPlayerTracker}
              value={value}
              winningBoxes={winningBoxes}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export type SetState<T> = Dispatch<SetStateAction<T>>;

const WINNING_PATTERNS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];

function isGameWon(
  boxes: { [key: string]: BoxValue },
  setGameOn: SetState<boolean>,
  setWinningBoxes: SetState<string[] | null>,
) {
  const markedWinningPattern = getMarkedWinningPattern(boxes, WINNING_PATTERNS);

  if (markedWinningPattern) {
    setWinningBoxes(markedWinningPattern);
    setGameOn(false);
  }
}

function getMarkedWinningPattern(
  boxes: { [key: string]: BoxValue },
  winningPatterns: string[][],
) {
  for (const pattern of winningPatterns)
    if (
      pattern.every((box) => boxes[box] === "X") ||
      pattern.every((box) => boxes[box] === "O")
    )
      return pattern;

  return null;
}
