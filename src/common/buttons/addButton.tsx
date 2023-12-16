import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

interface IButtonProps {
  name: string | undefined;
  handleClick: () => void;
  className?: string;
  disabled?: boolean;
}

const AddButton = ({
  name,
  handleClick,
  disabled,
}: IButtonProps) => {
  return (
    <button
      className={`${
        disabled
          ? " flex h-8 items-center items-center justify-center gap-2  rounded rounded-md  bg-blue-300 px-2.5 text-sm text-white focus:outline-none"
          : " flex h-8 items-center justify-center gap-2 rounded-md bg-primary-blue px-2.5 text-sm text-white transition duration-300 hover:bg-hover-blue"
      }  `}
      type="button"
      onClick={handleClick}
      disabled={disabled}
    >
      <span>{name}</span>
      <IoIosAddCircleOutline className="h-5 w-5" />
    </button>
  );
};

export default AddButton;
