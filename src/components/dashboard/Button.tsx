import React from "react";

interface ButtonProps {
  loading: boolean;
  handleSubmit?: () => void;
  title: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}
const Button: React.FC<ButtonProps> = ({
  loading,
  handleSubmit,
  title,
  className = "",
  type,
}) => {
  return (
    <button
      disabled={loading}
      className={`${className} w-full py-3 px-4 text-sm tracking-wide rounded-xl text-white bg-blue-600  hover:bg-blue-700 focus:outline-none  `}
      onClick={handleSubmit}
      type={type}
    >
      {loading ? "processing ..." : title}
    </button>
  );
};

export default Button;
