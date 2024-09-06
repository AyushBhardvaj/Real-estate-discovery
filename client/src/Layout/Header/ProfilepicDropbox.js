import { useMediaQuery } from "@mui/material";
import { persistor } from "store";
import ErrorDisplay from "components/ErrorDisplay";
import LoadingBackdrop from "components/LoadingBackdrop";
import { useLogoutUserMutation } from "features/authentication/authApi";
import { removeUser } from "features/authentication/authSlice";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilepicDropbox = ({ profilemenuStatus }) => {
  const [logoutUser, { isLoading, error }] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:1024px)");
  const [openSnackbar, setopenSnackbar] = useState(false);

  const handleLogout = async () => {
    try {
      profilemenuStatus(false);
      const { data } = await logoutUser();
      if (data?.success) {
        // await persistor.flush();
        persistor.purge();
        dispatch(removeUser());
        navigate("/auth");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfile = () => {
    profilemenuStatus(false);
    navigate("/profile");
  };

  const handleHome = () => {
    profilemenuStatus(false);
    navigate("/");
  };

  const handleAbout = () => {
    profilemenuStatus(false);
    navigate("/about");
  };

  useEffect(() => {
    if (error) {
      setopenSnackbar(true);
    }
  }, [error]);

  return (
    <div>
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
      <div className=" w-20 bg-slate-50 rounded-md border border-gray-300 shadow-md text-md text-gray-500 cursor-pointer">
        {!isNonMobile && (
          <div>
            <div
              className="flex py-[0.4rem] px-3 text-gray-600"
              onClick={handleHome}
            >
              Home
            </div>
            <div
              className="flex py-[0.4rem] px-3 text-gray-600"
              onClick={handleAbout}
            >
              About
            </div>
          </div>
        )}
        <div
          className=" w-full flex items-center hover:bg-slate-100 px-3 py-1"
          onClick={handleLogout}
        >
          Logout
        </div>
        <div
          className=" w-full flex items-center hover:bg-slate-100 px-3 py-1"
          onClick={handleProfile}
        >
          Profile
        </div>
      </div>
    </div>
  );
};

export default ProfilepicDropbox;
