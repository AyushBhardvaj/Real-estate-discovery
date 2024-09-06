import React, { useEffect, useState } from "react";
import { useGetUserListingsMutation } from "../profileApi";
import ProfileListingUi from "./ProfileListingUi";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../profileSlice";

const ProfileListing = () => {
  const [openListing, setOpenListing] = useState(false);
  const { userListings } = useSelector((state) => state.profile);
  const [getUserListings, { error, isLoading }] = useGetUserListingsMutation();
  const dispatch = useDispatch();

  const handleUserListing = async () => {
    setOpenListing(!openListing);
  };

  const listingApi = async () => {
    try {
      const { data } = await getUserListings();
      if (data?.success) {
        dispatch(setListings(data?.listings));
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    listingApi();
  }, []);

  return (
    <div className=" w-full">
      <ProfileListingUi
        handleUserListing={handleUserListing}
        openListing={openListing}
        userListings={userListings}
      />
    </div>
  );
};

export default ProfileListing;
