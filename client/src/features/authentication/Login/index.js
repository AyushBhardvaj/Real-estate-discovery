import React, { useEffect, useState } from "react";
import { useLoginUserMutation } from "../authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../authSlice";
import { useNavigate } from "react-router-dom";
import LoginUi from "./LoginUi";
import LoadingBackdrop from "components/LoadingBackdrop";
import ErrorDisplay from "components/ErrorDisplay";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = async (values, { resetForm }) => {
    try {
      const { data } = await loginUser(values);

      resetForm();

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
      <LoginUi
        initialValues={initialValues}
        formSubmit={formSubmit}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </div>
  );
};

export default Login;
