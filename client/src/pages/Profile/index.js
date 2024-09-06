import ProfileUpdate from "features/profile/ProfileUpdate";
import ProfileListing from "features/profile/ProfileListing";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className=" w-full h-full">
      <div className=" w-full h-full relative bg-slate-100 flex flex-col items-center justify-center py-10 md:py-20">
        <div className=" sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] w-full flex flex-col items-center gap-5 px-2">
          <h2 className=" font-semibold text-[1.75rem]">Profile</h2>
          <ProfileUpdate />
          <div className="w-full">
            <button
              onClick={() => navigate("/createlisting")}
              className="w-full h-12 bg-[#108238] hover:bg-[#056c29] rounded-md text-[1rem] font-medium text-slate-100 uppercase"
            >
              Create Listing
            </button>{" "}
          </div>
          <div className="w-full flex justify-between">
            <div className=" text-[1.1rem] font-medium text-red-500 cursor-pointer hover:underline hover:text-red-700">
              Delete Account
            </div>
            <div className=" text-[1.1rem] font-medium text-red-500 cursor-pointer hover:underline hover:text-red-700">
              Sign out
            </div>
          </div>
        </div>

        <div className=" w-full flex justify-center mt-[5rem]">
          <div className=" w-full sm:w-[70%] md:w-[60%] lg:w-[50%] flex justify-center">
            <ProfileListing />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
