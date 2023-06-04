"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  register: UseFormRegister<FieldValues>;
  type: string;
  id: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ register, type, id, required }) => {
  return <input type={type} id={id} {...register(id, { required })} />;
};

export default Input;
