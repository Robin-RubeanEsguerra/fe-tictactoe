import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormImputProps {
  name: string;
  label: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  className?: string;
}

const FormImput: React.FC<FormImputProps> = ({
  name,
  label,
  type = "text",
  register,
  error,
  className = "",
}) => {
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

export default FormImput;
