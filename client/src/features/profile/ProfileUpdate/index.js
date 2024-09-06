import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "features/authentication/authSlice";
import { useUpdateProfileMutation } from "../profileApi";
import ErrorDisplay from "components/ErrorDisplay";
import ProfileUpdateUi from "./ProfileUpdateUi";
import LoadingBackdrop from "components/LoadingBackdrop";

const ProfileUpdate = () => {
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();
  const { user } = useSelector((state) => state.persisted.user);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const initialValues = {
    fullName: user.fullName,
    email: user.email,
  };

  const updateSubmit = async (values) => {
    try {
      const formData = new FormData();
      const valueProps = Object.keys(values);

      valueProps.forEach(async (value) => {
        formData.append(value, values[value]);
      });
      if (newProfilePic) {
        formData.append("profilePic", JSON.stringify(newProfilePic));
      }

      const { data } = await updateProfile(formData);
      console.log(data);

      if (data?.success) {
        dispatch(setUser(data));
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error.data?.error);
    }
  }, [error]);

  return (
    <div className="w-full h-full relative">
      {isLoading ? (
        <LoadingBackdrop openBackdrop={isLoading} />
      ) : (
        error && (
          <ErrorDisplay
            message={errorMessage}
            handleClose={() => setErrorMessage("")}
          />
        )
      )}
      <ProfileUpdateUi
        initialValues={initialValues}
        updateSubmit={updateSubmit}
        user={user}
        newProfilePic={newProfilePic}
        setNewProfilePic={setNewProfilePic}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </div>
  );
};

export default ProfileUpdate;
