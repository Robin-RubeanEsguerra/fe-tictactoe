"use client";
import {
  RegisterUserData,
  registerUserSchema,
} from "@/lib/schemas/registerUserSchema";
import { registerUser } from "@/lib/services/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FormInput from "../Forms/FormInput";
import { useState } from "react";
import { Button, SpecialButton } from "../shared/Button";
import { LoadingCircle } from "../shared/LoadingCircle";
import { Button1 } from "@/assets";
import { ZodError } from "zod";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<RegisterUserData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    const formValues = getValues();

    try {
      const parsed = registerUserSchema.parse(formValues);
      await registerUser(parsed);
      toast.success("Account made successfully! Please proceed to login.");
      reset();
    } catch (error) {
      setLoading(false)
      if (error instanceof ZodError) {
        error.issues.forEach((issue) => {
          toast.error(issue.message);
        });
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
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
            type="submit"
            backgroundImage={Button1}
          >
            {loading ? <LoadingCircle /> : "Register"}
          </SpecialButton>
        </div>
      </form>
    </div>
  );
};
