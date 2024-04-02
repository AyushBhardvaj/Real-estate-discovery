import React from "react";

const GoogleSignup = () => {
  return (
    <div className="w-full">
      <a
        href="http://localhost:5000/auth/google"
        className="w-full h-12 bg-red-700 hover:bg-red-800 active:bg-red-500 text-white uppercase rounded-md"
      >
        Continue with google
      </a>
    </div>
  );
};

export default GoogleSignup;
