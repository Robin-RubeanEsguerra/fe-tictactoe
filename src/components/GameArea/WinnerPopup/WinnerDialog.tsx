// components/WinnerDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/shared/Dialog";
import {  SpecialButton } from "../../shared/Button";
import { createMoves } from "@/lib/services/move";
import { createGameRound, endGameRound } from "@/lib/services/gameRound";
import { Button1,  } from "@/assets";
import { WinnerDisplay } from "./WinnerDisplay";
import { Label } from "../../shared/Label";
import {
  createGameInstance,
  endGameInstance,
} from "@/lib/services/gameInstance";
import { EndGameInstanceData } from "@/lib/schemas/gameInstanceSchema";
import { useState } from "react";
import { LoadingCircle } from "../../shared/LoadingCircle";
import { showErrorDialog } from "@/components/shared/ErrorDialog";
type Move = {
  index: number;
  player: number;
};
interface WinnerDialogProps {
  open: boolean;
  winner: number | "tie";
  moves: Move[];
  gameRoundUuid: string;
  onClose: () => void;
  onReset?: () => void;
  gameUuid: string;
}

export const WinnerDialog = ({
  open,
  winner,
  gameRoundUuid,
  onClose,
  onReset,
  moves,
  gameUuid,
}: WinnerDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [gameInstance, setGameInstance] = useState<EndGameInstanceData | null>({
    _id: "",
    status: "",
    gameRounds: [],
    gameUuid: "00000000-0000-0000-0000-000000000000",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
    userUuid: "00000000-0000-0000-0000-000000000000",
    roundsPlayed: 0,
    winner: "",
    score: {
      player1: 0,
      player2: 0,
    },
  });

  const startNewRound = async () => {
    setLoading(true);
    try {
      if (gameRoundUuid && gameUuid) {
        const validWinner = winner === "tie" ? 0 : Number(winner);
        await createMoves({ gameRoundUuid, moves });
        await endGameRound({ gameRoundUuid, winner: validWinner });
        const newGameRound = await createGameRound({ gameUuid });
        onClose();

        window.location.href = `/${gameUuid}/${newGameRound.savedGameRound.gameRoundUuid}`;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showErrorDialog({ error: error as Error });
    }
  };

  const handleEndGameInstance = async () => {
    setLoading(true);
    try {
      const validWinner = winner === "tie" ? 0 : Number(winner);
      await createMoves({ gameRoundUuid, moves });
      await endGameRound({ gameRoundUuid, winner: validWinner });
      const endgame = await endGameInstance({ gameUuid });
      setGameInstance(endgame);
      setLoading(false);
      console.log("endgame", endgame);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching game data:", error);
    }
  };

  const handleNewGame = async () => {
    const gameInstance = await createGameInstance();
    const gameRound = await createGameRound({
      gameUuid: gameInstance.gameUuid,
    });

    const gameUuid = gameInstance.gameUuid;
    const gameRoundUuid = gameRound.savedGameRound.gameRoundUuid;
    window.location.href = `/${gameUuid}/${gameRoundUuid}`;
  };

  const player1 = gameInstance?.score.player1 ?? 0;
  const player2 = gameInstance?.score.player2 ?? 0;
  const roundsPlayed = gameInstance?.roundsPlayed ?? 0;
  const draws = roundsPlayed - (player1 + player2);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="" showCloseButton={false} disableOutsideClick>
        {loading ? (
          <div className="flex flex-col space-y-5">
            <Label variant="primary" className="text-center text-5xl ">
              Loading Zone...
            </Label>
            <LoadingCircle />
          </div>
        ) : (
          <div>
            <DialogHeader>
              <DialogTitle className=" text-center">
                <Label className=" font-normal text-5xl ">
                  {gameInstance?.status === "completed"
                    ? "Game Over"
                    : "Round Over"}
                </Label>
              </DialogTitle>
              {gameInstance?.status === "completed" ? (
                <DialogDescription className="text-center text-md ">
                  {gameInstance.winner === "tie" ? (
                    <Label className="text-3xl">It`&apos;s a tie!</Label>
                  ) : (
                    <>
                      <Label className="text-3xl " variant="secondary">
                        Player <span className="font-bold">{winner}</span> is
                        the Winner!
                      </Label>
                    </>
                  )}
                </DialogDescription>
              ) : (
                <DialogDescription className="text-center text-md ">
                  {winner === "tie" ? (
                    <Label className="text-3xl">It`&apos;s a tie!</Label>
                  ) : (
                    <>
                      <Label className="text-3xl " variant="secondary">
                        Player{" "}
                        <span className="font-bold text-primary">{winner}</span>{" "}
                        wins!
                      </Label>
                    </>
                  )}
                </DialogDescription>
              )}

              {gameInstance?.status === "completed" ? (
                <WinnerDisplay
                  winner={
                    gameInstance.winner === "tie"
                      ? "tie"
                      : Number(gameInstance.winner)
                  }
                />
              ) : (
                <WinnerDisplay winner={winner} />
              )}
            </DialogHeader>

            {gameInstance?.status === "completed" && (
              <div className="text-3xl flex flex-col p-4 bg-beige rounded-md shadow-2xs">
                <Label className="text-gray-800 text-start text-shadow-black">
                  Game Summary:
                </Label>
                <Label className="text-gray-800 text-shadow-black px-10 text-2xl flex flex-col">
                  <div className="flex items-center w-full flex-nowrap">
                    <span className="text-nowrap">Player X Score:</span>
                    <div className="border-dashed w-full mx-4 border-b-2" />
                    {player1}
                  </div>

                  <div className="flex items-center w-full flex-nowrap">
                    <span className="text-nowrap">Player O Score:</span>
                    <div className="border-dashed w-full mx-4 border-b-2" />
                    {player2}
                  </div>

                  <div className="flex items-center w-full flex-nowrap">
                    <span className="text-nowrap">Draws:</span>
                    <div className="border-dashed w-full mx-4 border-b-2" />
                    {draws}
                  </div>

                  <div className="flex items-center w-full flex-nowrap">
                    <span className="text-nowrap">Rounds Played:</span>
                    <div className="border-dashed w-full mx-4 border-b-2" />
                    {roundsPlayed}
                  </div>
                </Label>
              </div>
            )}

            {onReset && (
              <DialogFooter className="gap-0 h-fit flex flex-row">
                {gameInstance?.status === "completed" ? (
                  <SpecialButton
                    backgroundImage={Button1}
                    onClick={() => {
                      handleNewGame();
                    }}
                    className="w-full text-[30px] h-20"
                  >
                    New Game
                  </SpecialButton>
                ) : (
                  <SpecialButton
                    backgroundImage={Button1}
                    onClick={() => {
                      startNewRound();
                      onReset();
                    }}
                    className="w-full text-[30px] h-20"
                  >
                    New Round
                  </SpecialButton>
                )}
                {gameInstance?.status === "completed" ? (
                  <SpecialButton
                    onClick={() => {
                      window.location.href = `/`;
                    }}
                    backgroundImage={Button1}
                    className="w-full text-[30px] h-20"
                  >
                    Home
                  </SpecialButton>
                ) : (
                  <SpecialButton
                    onClick={() => {
                      handleEndGameInstance();
                    }}
                    backgroundImage={Button1}
                    className="w-full text-[30px] h-20"
                  >
                    End Game
                  </SpecialButton>
                )}
              </DialogFooter>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
