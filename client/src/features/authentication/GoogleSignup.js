import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { useGoogleLoginMutation } from "./authApi";
import LoadingBackdrop from "components/LoadingBackdrop";
import ErrorDisplay from "components/ErrorDisplay";

const GoogleSignup = () => {
  const [openSnackbar, setopenSnackbar] = useState(false);
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
        alert(error);
      }
    },
    flow: "auth-code",
  });

  return (
    <div className="w-full">
      {isLoading ? (
        <LoadingBackdrop openBackdrop={isLoading} />
      ) : (
        error && (
          <ErrorDisplay
            message={error?.data?.error}
            open={openSnackbar}
            handleClose={() => setopenSnackbar(false)}
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
