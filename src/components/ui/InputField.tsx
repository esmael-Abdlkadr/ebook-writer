import { forwardRef, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";

interface InputFieldProps {
  placehodler: string;
  title: string;
  errorMessage?: string;
  value?: string;
  type?: string;
  readonly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

//forwardRef to => forward refs
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      placehodler,
      title,
      errorMessage,
      value,
      onChange,
      type,
      readonly,
      onClick,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div>
        <label className="text-sm font-semibold text-gray-500 ">{title}</label>
        <div className="relative mt-4">
          <div className={`w-full flex  gap-1   `}>
            <input
              ref={ref}
              type={showPassword && type === "password" ? "text" : type}
              placeholder={placehodler}
              value={value}
              onChange={onChange}
              readOnly={readonly}
              onClick={onClick}
              className={`px-4 py-3 bg-gray-100 w-full text-sm outline-none 
                 `}
            />
          </div>

          {type === "password" && (
            <button
              type="button"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <FaRegEyeSlash
                  className="text-gray-500 absolute right-4 top-3"
                  size={20}
                />
              ) : (
                <MdOutlineRemoveRedEye
                  className="text-gray-500 absolute right-4 top-3"
                  size={20}
                />
              )}
            </button>
          )}
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
