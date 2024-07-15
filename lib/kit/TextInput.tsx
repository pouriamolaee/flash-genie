import { forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const TextInput = forwardRef<HTMLInputElement, InputProps>(function TextInput(
  { className, ...props },
  ref,
) {
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
