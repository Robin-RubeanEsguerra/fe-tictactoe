"use client";

import Link from "next/link";
import { SpecialButton } from "../shared/Button";
import { AccountDialog } from "../Account/AccountDialog";
import { HistoryDialog } from "../History/HistoryDialog";
import { Title } from "./Title";
import { Button1 } from "@/assets";
import { createGameInstance } from "@/lib/services/gameInstance";
import { createGameRound } from "@/lib/services/gameRound";
import { LoggedInUser } from "../Account/LoggedInUser";
import { UseAuthStore } from "@/lib/store/use-logged-in-user";
import Swal from "sweetalert2";

export const Homepage = () => {
  const { isAuthenticated, initializeAuth } = UseAuthStore();
  const handleGameInstance = async () => {
    initializeAuth();
    if (!isAuthenticated) {
      Swal.fire({
        title: "Oops...",
        text: "You need to be logged in to play Tic-Tac-Toe",
        icon: "error",
        confirmButtonText: "Ok",
      });
    };
    try {
      const gameInstance = await createGameInstance();
      const gameRound = await createGameRound({
        gameUuid: gameInstance.gameUuid,
      });

      const gameUuid = gameInstance.gameUuid;
      const gameRoundUuid = gameRound.savedGameRound.gameRoundUuid;
      window.location.href = `/${gameUuid}/${gameRoundUuid}`;

      console.log(gameRound);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="space-y-20 md:space-y-16">
        <Title />
        <div className="flex justify-center">
          <div className="flex flex-col space-y-2">
            <SpecialButton
              onClick={handleGameInstance}
              backgroundImage={Button1}
            >
              Start!
            </SpecialButton>
            <AccountDialog />
            <HistoryDialog />
          </div>
        </div>
      </div>
    </div>
  );
};
