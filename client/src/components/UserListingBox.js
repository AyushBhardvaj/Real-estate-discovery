import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useDeleteListingMutation } from "features/profile/profileApi";
import { useDispatch } from "react-redux";
import { setListings } from "features/profile/profileSlice";
import { useNavigate } from "react-router-dom";

const UserListingBox = ({ id, title = "", pic }) => {
  const [deleteListing, { error, isLoading }] = useDeleteListingMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    try {
      const { data } = await deleteListing(id);
      e.stopPropagation();
      if (data?.success) {
        dispatch(setListings(data.listings));
        alert("Listing successfully deleted");
      }
    } catch (error) {
      console.error(console.error());
    }
  };

  const handleUpdate = (e) => {
    navigate(`/update-listing/${id}`);
    e.stopPropagation();
  };

  const handleBoxClick = () => {
    return navigate(`/listing/${id}`);
  };
  return (
    <div className="w-full">
      <div
        onClick={handleBoxClick}
        className="w-full h-[9rem] flex items-center gap-6 bg-white border border-gray-300 rounded-md cursor-pointer px-5 py-5"
      >
        <div className=" w-[8rem]  rounded-md">
          <img
            src={pic}
            alt=""
            style={{
              height: "100%",
              weight: "100%",
              borderRadius: "5px",
              objectFit: "contain",
            }}
          />
        </div>
        <div className=" h-full flex grow items-start">
          <h5 className=" text-[1.4rem] font-medium">{title} </h5>
        </div>
        <div className=" flex flex-col items-center gap-2">
          <button
            onClick={handleUpdate}
            className="w-[5.5rem] h-[2.3rem] flex items-center justify-center gap-2 bg-gray-50 ring-1 ring-black rounded-md text-lg text-black hover:bg-black hover:text-white"
          >
            <IconPencil stroke={2} />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="w-[6.5rem] h-[2.5rem] flex items-center justify-center gap-1 bg-[#ED0800] text-white text-lg  rounded-md hover:bg-red-700"
          >
            <IconTrash width="2rem" stroke={1.5} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserListingBox;
