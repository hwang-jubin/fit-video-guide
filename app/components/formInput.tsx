"use client";

import { EnvelopeIcon, UserIcon, KeyIcon } from "@heroicons/react/24/solid";
import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}

type IconName = "email" | "username" | "password" | "confirm_password";

// IconName의 type에 value는 JSX.Element
const icon: Record<IconName, JSX.Element> = {
  email: (
    <EnvelopeIcon className="absolute size-7 left-3 top-2  text-neutral-400" />
  ),
  username: (
    <UserIcon className="absolute size-7 left-3 top-2  text-neutral-400" />
  ),
  password: (
    <KeyIcon className="absolute size-7 left-3 top-2 text-neutral-400" />
  ),
  confirm_password: (
    <KeyIcon className="absolute size-7 left-3 top-2 text-neutral-400" />
  ),
};

export default function FormInput({
  name,
  errors,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  console.log(errors);

  return (
    <div className="relative w-full">
      <input
        name={name}
        {...rest}
        className={`w-full pl-12 pr-4 py-2 rounded-full border-2  
            focus:ring-2 focus:ring-offset-1 ${
              errors && errors.length == 0
                ? "border-neutral-200 focus:ring-neutral-300"
                : "border-red-500 focus:ring-red-500"
            } focus:outline-none`}
      />
      {icon[name as IconName] || null}
      {errors?.map((error, index) => (
        <div
          key={index}
          className="text-red-500 font-medium text-sm mt-1 ml-5 "
        >
          {error}
        </div>
      ))}
    </div>
  );
}
