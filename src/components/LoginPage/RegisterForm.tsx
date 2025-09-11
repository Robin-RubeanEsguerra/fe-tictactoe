"use client"
import {
  RegisterUserData,
  registerUserSchema,
} from "@/lib/schemas/registerUserSchema";
import { registerUser } from "@/lib/services/auth";
import { UseAccountDialogStore } from "@/lib/store/use.account.dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FormInput from "../Forms/FormInput";
import { useState } from "react";
import { set } from "zod";
import { Button, SpecialButton } from "../shared/Button";
import { LoadingCircle } from "../shared/LoadingCircle";
import { Button1 } from "@/assets";

export const RegisterForm = () => {
    const [loading,setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterUserData>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterUserData) => {
    setLoading(true)
    try {
      await registerUser(values);
       toast.success("Account made successfully! Please Proceed to Login");
        setLoading
       reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        setLoading(false)
      } else {
        toast.error("An unexpected error occurred");
        setLoading(false)
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[500px] space-y-4"
      >
        <FormInput
          name="username"
          label="Username"
          register={register}
          error={errors.username}
          />
      <FormInput
          name="email"
          label="Email"
          register={register}
          error={errors.email}
        />
       <FormInput
          name="password"
          label="Password"
          type="password"
          register={register}
          error={errors.password}
        />
       <FormInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          register={register}
          error={errors.confirmPassword}
          />
         <div className="flex justify-center">
           <SpecialButton
            className="text-[25px] w-full py-1"
            type="submit" backgroundImage={Button1}    >
                {loading ? <LoadingCircle/> : "Register"}
           </SpecialButton>
         </div>
      </form>
    </div>
  );
};
