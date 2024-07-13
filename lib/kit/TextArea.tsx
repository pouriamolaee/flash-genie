import { forwardRef, TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextArea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={twMerge("textarea textarea-bordered", className)}
      {...props}
    />
  );
});

export default TextArea;
