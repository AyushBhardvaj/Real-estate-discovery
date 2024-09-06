import ProfilePicUpload from "components/ProfilePicUpload";
import { Formik } from "formik";
import React, { useRef } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { updateProfileSchemaValidation } from "utils/validationSchema";

const ProfileUpdateUi = ({
  initialValues,
  updateSubmit,
  user,
  newProfilePic,
  setNewProfilePic,
  showPassword,
  setshowPassword,
}) => {
  const imageRef = useRef();

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={updateProfileSchemaValidation}
        onSubmit={updateSubmit}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="w-full flex flex-col items-center">
                <ProfilePicUpload
                  imageUpload={setNewProfilePic}
                  profilePic={
                    newProfilePic ? newProfilePic : user?.profilePic
                  }
                  imageRef={imageRef}
                />
                <h4 className=" text-lg font-semibold">
                  Upload your Profile pic!
                </h4>
                <div className="w-full flex flex-col gap-7 mb-7 mt-4">
                  <div className=" relative">
                    <input
                      type="text"
                      name="fullName"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Full Name..."
                      className="w-full h-12 bg-white rounded-md border focus:outline-none placeholder:text-gray-500 px-4"
                    />
                    {touched.fullName && errors.fullName && (
                      <p className=" absolute text-sm text-red-600 ml-2">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div className=" relative">
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Email..."
                      className="w-full h-12 bg-white rounded-md border focus:outline-none placeholder:text-gray-500 px-4"
                      disabled={!user?.password}
                    />
                    {touched.email && errors.email && (
                      <p className=" absolute text-sm text-red-600 ml-2">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  {user?.password && (
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
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#002D62] rounded-md text-[1rem] font-medium text-slate-100 uppercase"
              >
                Update Profile
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ProfileUpdateUi;
