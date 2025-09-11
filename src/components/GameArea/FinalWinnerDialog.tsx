// components/FinalWinnerDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/shared/Dialog";
import { Button, SpecialButton } from "../shared/Button";
import { createMoves } from "@/lib/services/move";
import { createGameRound, endGameRound } from "@/lib/services/gameRound";
import { Button1, Button2, Chu, Juberto } from "@/assets";
import Image from "next/image";
import { WinnerDisplay } from "./WinnerPopup/WinnerDisplay";
import { useScoreStore } from "@/lib/store/use-logged-in-user";
import { set } from "zod";
import { Label } from "../shared/Label";
import { endGameInstance } from "@/lib/services/gameInstance";
type Move = {
  index: number;
  player: number;
};
interface FinalWinnerDialogProps {
  open: boolean;
  winner: number | "tie";
  moves: Move[];
  gameRoundUuid: string;
  onClose: () => void;
  onReset?: () => void;
  gameUuid: string;
}

export const FinalWinnerDialog = ({
  open,
  winner,
  gameRoundUuid,
  onClose,
  onReset,
  moves,
  gameUuid,
}: FinalWinnerDialogProps) => {
  

  const handleEndGameInstance = async () => {
    try {
      const gameInstance = await endGameInstance({ gameUuid });
      console.log(gameInstance);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle className=" text-center">
            <Label className="text-black font-normal text-4xl ">Round Over</Label>
          </DialogTitle>
          <DialogDescription className="text-center text-md ">
            {winner === "tie" ? (
              <Label className="text-black">It's a tie!</Label>
            ) : (
              <>
                <Label className="text-black">
                  Player{" "}
                  <span className="font-bold text-primary">{winner}</span> wins!
                </Label>
              </>
            )}
          </DialogDescription>
          <WinnerDisplay winner={winner} />
        </DialogHeader>
          <DialogFooter className="mt-4">
           <SpecialButton
             
              backgroundImage={Button2}
              className="w-full text-[20px] h-20"
            >
             Return to Home
            </SpecialButton>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
