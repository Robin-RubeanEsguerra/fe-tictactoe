import React from "react";
import {
  FieldError,
  UseFormRegister,
  Path,
  FieldValues,
} from "react-hook-form";

interface FormInputProps<T extends FieldValues> { 
  name: Path<T>;
  label: string;
  type?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  className?: string;
}

const FormInput = <T extends FieldValues>({
  name,
  label,
  type = "text",
  register,
  error,
  className = "",
}: FormInputProps<T>) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-md font-medium mb-1">
        {label}
      </label>
      <input
        id={name}
        placeholder={`Please enter ${label}`}
        type={type}
        {...register(name)}
        className="w-full border px-3 py-2 rounded bg-white"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FormInput;
