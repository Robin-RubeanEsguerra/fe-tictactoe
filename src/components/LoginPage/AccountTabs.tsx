"use client";

import { TabsList, TabsTrigger, TabsContent, Tabs } from "../shared/Tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const AccountTabs = () => {
  return (
    <Tabs defaultValue="login" className="">
      <TabsList className="w-full gap-2">
        <TabsTrigger
          className="flex w-full bg-ttt-orange shadow-amber-200 text-white"
          value="login"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value="register"
          className="flex w-full bg-ttt-orange shadow-amber-200 text-white"
        >
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
};
