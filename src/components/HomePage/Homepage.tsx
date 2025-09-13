"use client";

import Link from "next/link";
import { MenuButton, SpecialButton } from "../shared/Button";
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
      return;
    }
    try {
      Swal.fire({
        title: "Preparing game zone...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

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
    <div className=" flex items-center justify-center lg:mt-6">
      <div className="space-y-14 md:space-y-16">
        <Title />
        <div className="flex justify-center">
          <div className="-space-y-8 md:space-y-0 lg:space-y-4 flex flex-col ">
            <MenuButton onClick={handleGameInstance}>Start!</MenuButton>
            <AccountDialog />
            <HistoryDialog />
          </div>
        </div>
      </div>
    </div>
  );
};
