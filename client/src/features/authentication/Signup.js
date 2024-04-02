import { Formik } from "formik";
import React, { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useRegisterUserMutation } from "./authApi";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const [showPassword, setshowPassword] = useState(false);
  const formSubmit = async (values) => {
    try {
      console.log(values);
      const signedinUser = await fetch("http://localhost:5000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const savedUser = await signedinUser.json();
    } catch (error) {}
  };
  return (
    <div className="w-full">
      <Formik initialValues={initialValues} onSubmit={formSubmit}>
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
        }) => (
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="w-full flex flex-col gap-3 mb-3">
                <input
                  type="text"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Full Name..."
                  className="w-full h-12 bg-white rounded-md border focus:outline-none placeholder:text-gray-500 px-4"
                />
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email..."
                  className="w-full h-12 bg-white rounded-md border focus:outline-none placeholder:text-gray-500 px-4"
                />
                <div className="w-full h-12 relative flex items-center overflow-hidden">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password..."
                    className="w-full h-12 bg-white rounded-md border focus:outline-none placeholder:text-gray-500 px-4"
                  />
                  <div className="h-full px-2 flex items-center absolute top-0 right-0">
                    <div
                      onClick={() => setshowPassword(!showPassword)}
                      className=" p-1 bg-white hover:bg-slate-100 active:bg-slate-200 rounded-full cursor-pointer"
                    >
                      {showPassword ? <IconEyeOff /> : <IconEye />}
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-12 bg-[#002D62] rounded-md text-[1rem] font-medium text-slate-100 uppercase"
              >
                Sign up
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
