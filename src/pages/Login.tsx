import React, { useState } from "react";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../components/dashboard/Button";
import { useAuth } from "../contexts/AuthContext";

interface IFormInputs {
  email: string;
  password: string;
}
const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup.string().required("Password is required"),
});
const LogInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
      reset();
      navigate("/dashboard");
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
              Log in
            </h2>
            <form className="mt-8 space-y-4">
              <div>
                <label className="text-[#1e293b] text-sm mb-2 block font-medium">
                  Email
                </label>
                <div className="relative flex items-center">
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <input
                        type="email"
                        {...field}
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-primary-100"
                        placeholder="Enter email"
                      />
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-4 text-center font-semibold">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block font-medium">
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
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 my-6">
                <div className="text-sm flex items-center gap-3">
                  <span>Don't have an account?</span>
                  <Link
                    to={"/sign-up"}
                    className="text-primary-100 text-blue-700 underline"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>

              <div className="mt-10">
                <Button
                  title="Log in"
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

export default LogInForm;