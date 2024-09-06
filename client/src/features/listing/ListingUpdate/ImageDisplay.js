import React, { useState } from "react";
import { IconTrash } from "@tabler/icons-react";

const ImageDisplay = ({ pic, index, deleteImage }) => {
  const [imageHover, setImageHover] = useState();

  return (
    <div className="w-full h-full" key={index}>
      <div
        onMouseOver={() => setImageHover(true)}
        onMouseLeave={() => setImageHover(false)}
        className="w-full h-full flex justify-center items-center border-2 rounded-md relative cursor-pointer "
      >
        <img
          src={pic?.url}
          alt=""
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
        />
        {imageHover && (
          <div className=" absolute w-full h-full flex justify-center items-center bg-gray-700 opacity-80 z-10 rounded-md ">
            <div
              onClick={() => deleteImage(pic?.public_id)}
              className="flex p-1 border-4 border-white rounded-md hover:bg-gray-800"
            >
              <IconTrash stroke={3} color="white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;
