"use client";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

import { UseProfileDialogStore } from "@/lib/store/use.profile.dialog";
import { UseAuthStore } from "@/lib/store/use-logged-in-user";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shared/Dialog";

import { MenuButton, SpecialButton } from "../shared/Button";
import { Label } from "../shared/Label";

import { logoutUser } from "@/lib/services/auth";
import { serverHealthCheck } from "@/lib/services/clien";

import { handleErrorWithToast } from "@/lib/error-handler";
import { Button1 } from "@/assets";
import { UserResponseData } from "@/lib/schemas/userLoginSchema";
import { LoadingCircle } from "../shared/LoadingCircle";

export const LoggedInUser = () => {
  const { isProfileDialogModal, setProfileDialogModal } =
    UseProfileDialogStore();
  const { initializeAuth, isAuthenticated } = UseAuthStore();
  const [user, setUser] = useState<UserResponseData | undefined>(undefined);
const [loading,setLoading] =useState(false)
  const hasRun = useRef(false);

  useEffect(() => {
    initializeAuth(); 
    if (isAuthenticated && !hasRun.current) {
      hasRun.current = true;

      const run = async () => {
        try {
          const accessToken = Cookies.get("accessToken");
          if (!accessToken) return;

          const userData = await serverHealthCheck(accessToken);
          setUser(userData);
        } catch (e) {
          handleErrorWithToast(e);
        }
      };

      run();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logoutUser();
      setProfileDialogModal(false);
      setUser(undefined);
      setLoading(false)
      initializeAuth();
    } catch (error) {
      setLoading(false)
      handleErrorWithToast(error);
    }
  };

  return (
    <Dialog open={isProfileDialogModal} onOpenChange={setProfileDialogModal}>
      <DialogTrigger asChild>
        <MenuButton>Profile</MenuButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            <Label variant="primary" className="text-5xl font-normal">
              Profile
            </Label>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {user && (
          <div className="flex p-4 bg-beige rounded-md flex-col items-center justify-center">
            <div className=" text-center">
              <div className="flex flex-wrap text-2xl sm:gap-4 flex-start items-center">
                <Label className=" text-gray-700 " variant="custom">
                  Username:
                </Label>
                <Label variant="primary" className=" font-normal">
                  {user.username}
                </Label>
              </div>
              <div className="flex flex-wrap text-2xl sm:gap-4 flex-start items-center">
                <Label className=" text-gray-700 " variant="custom">
                  Email:
                </Label>
                <Label variant="primary" className=" font-normal">
                  {user.email}
                </Label>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex justify-center mt-6">
          <SpecialButton
            backgroundImage={Button1}
            className="text-[25px] h-[50px] w-full"
            onClick={handleLogout}
          >
           {loading ? <LoadingCircle/>:" Logout"}
          </SpecialButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
