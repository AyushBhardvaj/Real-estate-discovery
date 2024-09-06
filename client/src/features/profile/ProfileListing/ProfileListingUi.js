import UserListingBox from "components/UserListingBox";
import React from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import emptyState from "assets/emptyState.png";

const ProfileListingUi = ({ openListing, handleUserListing, userListings }) => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center gap-[4rem]">
        <button
          onClick={handleUserListing}
          className=" w-[11rem] h-10 flex justify-center items-center gap-2 rounded-md bg-white text-blue-700 border-2 border-blue-700 font-medium text-lg hover:scale-105 hover:bg-blue-700 hover:text-white active:bg-blue-800 "
        >
          Show Listings
          {openListing ? <IconChevronUp /> : <IconChevronDown />}
        </button>
        {openListing && (
          <div className=" w-full flex flex-col gap-3">
            {userListings?.length ? (
              userListings.map(({ _id, title, images }) => {
                return (
                  <UserListingBox
                    key={_id}
                    id={_id}
                    title={title}
                    pic={images[0]?.url}
                  />
                );
              })
            ) : (
              <div className="w-full flex justify-center">
                <div className=" flex flex-col items-center gap-5">
                  <div className=" w-[17rem]">
                    <img
                      src={emptyState}
                      alt=""
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className=" flex flex-col items-center gap-1">
                    <h6 className=" font-medium text-xl">
                      You haven't created any listing yet.
                    </h6>
                    <p className=" text-lg text-gray-500">
                      Click on "Create Listing" and find the best customer for
                      your property
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileListingUi;
