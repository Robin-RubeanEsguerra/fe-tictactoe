"use client";

import { UserLoginData, userLoginSchema } from "@/lib/schemas/userLoginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/lib/services/auth";
import { toast } from "sonner";
import { UseAccountDialogStore } from "@/lib/store/use.account.dialog";
import FormImput from "../Forms/FormInput";
import { SpecialButton } from "../shared/Button";
import { Button1 } from "@/assets";
import Cookies from "js-cookie";
import { showErrorWithToast } from "../shared/ErrorDialog";
import { LoadingCircle } from "../shared/LoadingCircle";
import { useState } from "react";
import { UseAuthStore } from "@/lib/store/use-logged-in-user";


export const LoginForm = () => {
  const { initializeAuth} = UseAuthStore()
  const [loading, setLoading] = useState(false);
  const {setAccountDialogMdodal} = UseAccountDialogStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginData>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: UserLoginData) => {
    setLoading(true);
    try {
      const data = await login(values);
      toast.success("Logged in successfully!");
      setLoading(false);
      setAccountDialogMdodal(false)
      Cookies.set("accessToken", data.accessToken);
       initializeAuth()
    } catch (error: unknown) {
      showErrorWithToast({ error: error as Error });
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[500px] space-y-4"
      >
        <FormImput
          name="email"
          label="Email"
          className=""
          register={register}
          error={errors.email}
        />

        <FormImput
          name="password"
          label="Password"
          type="password"
          register={register}
          error={errors.password}
        />

        <div className="flex justify-center">
          <SpecialButton
            type="submit"
            backgroundImage={Button1}
            className="text-[20px] py-1"
          >
            {loading ? <LoadingCircle /> : "Login"}
          </SpecialButton>
        </div>
      </form>
    </div>
  );
};
