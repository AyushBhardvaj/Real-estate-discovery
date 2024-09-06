import { Formik } from "formik";
import React from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { loginSchemaValidation } from "utils/validationSchema";

const LoginUi = ({
  initialValues,
  formSubmit,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchemaValidation}
        onSubmit={formSubmit}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isSubmitting,
          resetForm
        }) => (
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex flex-col gap-8 mb-8 mt-4">
                  <div className=" relative">
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Email..."
                      className="w-full h-12 bg-white rounded-md border focus:outline-none placeholder:text-gray-500 px-4"
                    />
                    {touched.email && errors.email && (
                      <p className=" absolute text-sm text-red-600 ml-2">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="relative">
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
                          onClick={() => setShowPassword(!showPassword)}
                          className=" p-1 bg-white hover:bg-slate-100 active:bg-slate-200 rounded-full cursor-pointer"
                        >
                          {showPassword ? <IconEyeOff /> : <IconEye />}
                        </div>
                      </div>
                    </div>
                    {touched.password && errors.password && (
                      <p className="absolute text-sm text-red-600 ml-2">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#002D62] rounded-md text-[1rem] font-medium text-slate-100 uppercase"
              >
                Login
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default LoginUi;
