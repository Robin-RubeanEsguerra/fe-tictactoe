"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Blocks } from "./Blocks";
import { Chu, Juberto } from "@/assets";
import { PlayerBlock } from "./PlayerBlock";
import { Label } from "../shared/Label";
import { WinnerGuestDialog } from "./WinnerGuestPopup/WinnerGuestDialog";

export const GuestGame = () => {

  const [winnerDialog, setWinnerDialog] = useState(false);
  const [blocks, setBlocks] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const checkWinner = useMemo(() => {
    return () => {
      const winnerLogic = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let logic of winnerLogic) {
        const [a, b, c] = logic;
        if (
          blocks[a] !== null &&
          blocks[a] === blocks[b] &&
          blocks[a] === blocks[c]
        ) {
          return { winner: blocks[a], combination: [a, b, c] };
        }
      }

      const isBoardFull = blocks.every((block) => block !== null);

      if (isBoardFull) {
        return { winner: "tie", combination: [] };
      }

      return null;
    };
  }, [blocks]);

  const winnerInfo = checkWinner();

  useEffect(() => {
    if (winnerInfo && winnerInfo.winner) {
      setWinnerDialog(true);
    }
  }, [winnerInfo]);

  const handleClick = useCallback(
    async (index: number) => {
      if (blocks[index] !== null) return;

      setBlocks((prevState) => {
        const newState = [...prevState];
        newState[index] = isXTurn ? 1 : 2;
        return newState;
      });

      setIsXTurn((prevTurn) => !prevTurn);
    },
    [blocks, isXTurn]
  );

  const handleReset = useCallback(() => {
    setBlocks(Array(9).fill(null));
    setIsXTurn(true);
  }, []);

  return (
    <div className=" gap-4 w-full  py-4 ">
      {winnerInfo && (
        <WinnerGuestDialog
          open={winnerDialog}
          winner={winnerInfo?.winner ?? ""}
          onClose={() => setWinnerDialog(false)}
          onReset={handleReset}
        />
      )}

      <div className="col-span-3  flex flex-col items-center justify-center">
        <div className="flex  flex-col leading-0  ">
          <Label className="text-6xl md:text-7xl" variant="primary">
            Tic-Tac-Toe
          </Label>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-6xl flex-col lg:flex-row w-full flex  ">
          <div className="lg:block hidden">
            <PlayerBlock player={"X"} image={Chu} active={isXTurn} />
          </div>
          <div className="w-full flex justify-center">
            <div className="grid grid-cols-3 gap-2 w-fit">
              {blocks.map((block, index) => (
                <Blocks
                  index={index}
                  key={index}
                  onClick={() => handleClick(index)}
                >
                  {Number(block)}
                </Blocks>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <PlayerBlock player={"O"} image={Juberto} active={!isXTurn} />
          </div>
          <div className="block lg:hidden">
            {!isXTurn ? (
              <PlayerBlock player={"O"} image={Juberto} active={!isXTurn} />
            ) : (
              <PlayerBlock player={"X"} image={Chu} active={isXTurn} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
