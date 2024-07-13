import { forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const TextInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function TextInput({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="text"
      className={twMerge("input input-bordered w-full max-w-xs", className)}
      {...props}
    />
  );
});

export default TextInput;
