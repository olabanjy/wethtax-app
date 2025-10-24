import clsx from "clsx";
import { MdSearch } from "react-icons/md";
import React from "react";

interface SearchbarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Searchbar = ({ className, ...inputProps }: SearchbarProps) => {
  return (
    <label
      className={clsx(
        "w-full h-9 px-4 bg-white",
        "border border-[#B8B8B8] rounded",
        "flex items-center gap-3",
        className
      )}
    >
      <MdSearch size={22} className="text-[#A0A0A0] shrink-0" />

      <input
        type="text"
        placeholder="Search"
        className={clsx(
          "w-full bg-transparent outline-none",
          "text-black placeholder:text-[#B3B3B3]",
          "text-xs"
        )}
        {...inputProps}
      />
    </label>
  );
};

export default Searchbar;
