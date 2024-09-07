import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { useGoogleLoginMutation } from "./authApi";
import LoadingBackdrop from "components/LoadingBackdrop";
import ErrorDisplay from "components/ErrorDisplay";

const GoogleSignup = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleLogin, { error, isLoading }] = useGoogleLoginMutation();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { data } = await googleLogin({ googleCode: response.code });
        console.log(response);

        if (data.success) {
          dispatch(setUser(data));
          navigate("/");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
    flow: "auth-code",
  });

  useEffect(() => {
    if (error) {
      setErrorMessage(error.data?.error);
    }
  }, [error]);

  return (
    <div className="w-full">
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
      <div className=" w-full">
        <button
          className="w-full h-12 bg-red-700 hover:bg-red-800 active:bg-red-500 text-white uppercase rounded-md"
          onClick={() => login()}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleSignup;
