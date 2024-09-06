import GoogleSignup from "features/authentication/GoogleSignup";
import Signup from "../../features/authentication/Signup";
import React, { useState } from "react";
import Login from "features/authentication/Login";

const Auth = () => {
  const [authState, setAuthState] = useState("login");
  return (
    <div className="w-full h-full">
      <div className={`w-full h-full bg-slate-100 flex justify-center ${authState === "login"?"py-20":"py-12"} `}>
        <div className="sm:w-[70%] md:w-[60%] lg:w-[40%] w-full flex flex-col gap-5 items-center px-2">
          <h2 className=" font-semibold text-[1.75rem] text-gray-700">
            {authState !== "login" ? "Signup" : "Login"}
          </h2>
          {authState === "login" ? <Login /> : <Signup />}
          <div className="w-full">
            <h6 className=" flex gap-1">
              {authState === "login"
                ? "Don't have an account?"
                : "Have an account?"}{" "}
              <div
                onClick={() =>
                  setAuthState(authState === "login" ? "signup" : "login")
                }
                className="underline text-blue-600 cursor-pointer"
              >
                {authState === "login" ? "Signup" : "Login"}
              </div>
              here
            </h6>
          </div>

          <GoogleSignup />
        </div>
      </div>
    </div>
  );
};

export default Auth;
