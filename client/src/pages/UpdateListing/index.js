import ListingUpdate from "features/listing/ListingUpdate";
import React from "react";

const UpdateListing = () => {
  return (
    <div>
      <div className="bg-slate-100 flex justify-center py-10">
        <div className=" w-full sm:w-[85%] md:w-[75%] lg:w-[85%] xl:w-[70%] flex flex-col items-center justify-center gap-5 px-2">
          <h2 className=" font-semibold text-[1.75rem]">Update the Listing</h2>
          <ListingUpdate />
        </div>
      </div>
    </div>
  );
};

export default UpdateListing;
