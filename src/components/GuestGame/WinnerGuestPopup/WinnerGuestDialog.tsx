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
import { SpecialButton } from "../../shared/Button";
import { Button1 } from "@/assets";
import { Label } from "../../shared/Label";
import { WinnerGuestDisplay } from "./WinnerGuestDisplay";

interface WinnerDialogProps {
  open: boolean;
  winner: number | "tie" | "";
  onClose: () => void;
  onReset: () => void;
}

export const WinnerGuestDialog = ({
  open,
  winner,
  onClose,
  onReset,
}: WinnerDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} disableOutsideClick>
        <DialogHeader>
          <DialogTitle className="text-center">
            <Label className="font-normal text-5xl">Game Over</Label>
          </DialogTitle>
          <DialogDescription className="text-center text-md">
            {winner === "tie" ? (
              <Label className="text-3xl">It`&apos;s a tie!</Label>
            ) : (
              <Label className="text-3xl" variant="secondary">
                Player{" "}
                <span className="font-bold text-primary">{winner}</span> wins!
              </Label>
            )}
          </DialogDescription>
          <WinnerGuestDisplay winner={winner} />
        </DialogHeader>

        <DialogFooter className="gap-0 h-fit flex flex-row">
          <SpecialButton
            backgroundImage={Button1}
            onClick={() => {
              onReset();
              onClose();
            }}
            className="w-full text-[30px] h-20"
          >
            Play Again
          </SpecialButton>

          <SpecialButton
            backgroundImage={Button1}
            onClick={() => {
              window.location.href = "/";
            }}
            className="w-full text-[30px] h-20"
          >
            Home
          </SpecialButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
