import React, { useState } from "react";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../components/dashboard/Button";
import { useAuth } from "../contexts/AuthContext";

interface IFormInputs {
  FullName: string;
  email: string;
  password: string;
  // rememberMe: boolean;
}
const schema = yup.object().shape({
  FullName: yup.string().required("Full Name is required   "),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup.string().required("Password is required"),
});
const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      FullName: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      setLoading(true);
      await signup(data.FullName, data.email, data.password, "user"); // Default role as author
      reset();
      navigate("/dashboard"); // Redirect after signup
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 font-sans">
      <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Sign up
            </h2>
            <form className="mt-8 space-y-4">
              <div>
                <label className="text-[#1e293b] text-sm mb-2 block  font-medium">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <Controller
                    control={control}
                    name="FullName"
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-primary-100"
                        placeholder="Enter Full Name"
                      />
                    )}
                  />
                </div>
                {errors.FullName && (
                  <p className="text-red-500 text-xs mt-4 text-center font-semibold">
                    {" "}
                    {errors.FullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[#1e293b] text-sm mb-2 block  font-medium">
                  Email
                </label>
                <div className="relative flex items-center">
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-primary-100"
                        placeholder="Enter email"
                      />
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-4 text-center font-semibold">
                    {" "}
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block  font-medium">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-primary-100"
                        placeholder="Enter password"
                      />
                    )}
                  />

                  <div className="absolute right-4 text-gray-400">
                    {showPassword ? (
                      <IoMdEye
                        onClick={() => setShowPassword(!showPassword)}
                        className="w-5 h-5 cursor-pointer"
                      />
                    ) : (
                      <IoIosEyeOff
                        onClick={() => setShowPassword(!showPassword)}
                        className="w-5 h-5 cursor-pointer"
                      />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-4 text-center font-semibold">
                    {" "}
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 my-6">
                <div className="text-sm  flex gap-4 items-center">
                  <span>Already have an account</span>
                  <Link
                    to={"/login"}
                    className="text-primary-100 hover:underline text-blue-500 font-semibold"
                  >
                    Login
                  </Link>
                </div>
              </div>

              <div className="mt-10">
                <Button
                  title="Sign up"
                  handleSubmit={handleSubmit(onSubmit)}
                  loading={loading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
