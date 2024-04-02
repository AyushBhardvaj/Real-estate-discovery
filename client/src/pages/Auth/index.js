import GoogleSignup from "features/authentication/GoogleSignup";
import Signup from "../../features/authentication/Signup";
import React from "react";

const Auth = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-slate-100 flex justify-center py-20 ">
        <div className="w-[40%] flex flex-col gap-5 items-center">
          <h2 className=" font-semibold text-[1.75rem] text-gray-700">
            Sign Up
          </h2>
          <Signup />
          <GoogleSignup />
        </div>
      </div>
    </div>
  );
};

export default Auth;
