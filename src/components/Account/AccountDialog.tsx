"use client";

import { Button1, Button2 } from "@/assets";
import { SpecialButton } from "../shared/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../shared/Dialog";
import { AccountTabs } from "../LoginPage/AccountTabs";
import { UseAccountDialogStore } from "@/lib/store/use.account.dialog";
import { UseAuthStore } from "@/lib/store/use-logged-in-user";
import { LoggedInUser } from "./LoggedInUser";

export const AccountDialog = () => {
  const { setAccountDialogMdodal, isAccountDialogModal } =
    UseAccountDialogStore();
    const { isAuthenticated, initializeAuth} = UseAuthStore();
    return (
    <Dialog open={isAccountDialogModal} onOpenChange={setAccountDialogMdodal}>
      <DialogTrigger asChild>
       {isAuthenticated ? <LoggedInUser /> : <SpecialButton  backgroundImage={Button1}>Accounts</SpecialButton> }
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="gap-0" >
        <DialogHeader className=" gap-0">
          <DialogTitle/>
          <DialogDescription/>
        </DialogHeader>
        <AccountTabs />
      </DialogContent>
    </Dialog>
  );
};
