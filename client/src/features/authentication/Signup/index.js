import React, { useState, useEffect } from "react";
import { useRegisterUserMutation } from "../authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../authSlice";
import { useNavigate } from "react-router-dom";
import SignupUI from "./SignupUi";
import LoadingBackdrop from "components/LoadingBackdrop";
import ErrorDisplay from "components/ErrorDisplay";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = async (values, { resetForm }) => {
    try {
      console.log(values);
      const formData = new FormData();
      const valueProps = Object.keys(values);

      valueProps.forEach(async (value) => {
        formData.append(value, values[value]);
      });

      if (!profilePic) {
        return setErrorMessage("Profile pic is required");
      }
      formData.append("profilePic", JSON.stringify(profilePic));

      const { data } = await registerUser(formData);
      resetForm();
      setProfilePic("");
      
      if (data?.success) {
        dispatch(setUser(data));
        navigate("/");
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
        errorMessage && (
          <ErrorDisplay
            message={errorMessage}
            handleClose={() => setErrorMessage("")}
          />
        )
      )}
      <SignupUI
        initialValues={initialValues}
        formSubmit={formSubmit}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        profilePic={profilePic}
        setProfilePic={setProfilePic}
      />
    </div>
  );
};

export default Signup;
