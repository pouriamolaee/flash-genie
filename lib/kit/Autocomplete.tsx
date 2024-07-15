import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";
import TextInput, { InputProps } from "@/lib/kit/TextInput";

interface Props {
  options: string[];
  value: string;
  onChange(val: string): void;
  className?: string;
  inputProps?: InputProps;
}

export default function Autocomplete({
  options,
  value,
  onChange,
  className,
  inputProps,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const filteredOptions = options.filter(filterSuggestions);

  function handleSelect(option: string) {
    const elem = document.activeElement as HTMLElement;
    elem.blur();
    onChange(option);
  }

  function filterSuggestions(option: string) {
    return option.toLowerCase().includes(value.toLowerCase());
  }

  return (
    <div className={twMerge("dropdown w-full", className)} ref={ref}>
      <TextInput
        className="input input-bordered max-w-full"
        ref={inputRef}
        value={value}
        onChange={({ target }) => onChange(target.value)}
        onFocus={() => onChange("")}
        {...inputProps}
      />
      {filteredOptions.length > 0 && (
        <div className="dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md">
          <ul
            tabIndex={0}
            className="menu menu-compact"
            style={{ width: ref.current?.clientWidth }}
          >
            {filteredOptions.map((option, index) => {
              return (
                <li
                  key={index}
                  tabIndex={index + 1}
                  onClick={() => handleSelect(option)}
                  className="w-full"
                >
                  <button>{option}</button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
