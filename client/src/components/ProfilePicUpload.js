import React, { useState } from "react";
import dummyPic from "assets/user.png";
import { getCloudinarySignature } from "utils/cloudinarySignature";
import { CircularProgress } from "@mui/material";

const ProfilePicUpload = ({ imageRef, imageUpload, profilePic }) => {
  const [imageLoading, setImageLoading] = useState(false);
  
  const handleImageUpload = async (e) => {
    try {
      setImageLoading(true);
      const { timestamp, signature } = await getCloudinarySignature();
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.REACT_APP_CLOUD_API_KEY);
      formData.append("signature", signature);
      formData.append("folder", "Estate_Sphere");

      const uploadResponse = await fetch(process.env.REACT_APP_CLOUD_URL, {
        method: "POST",
        body: formData,
      });

      const uploadResult = await uploadResponse.json();
      imageUpload({ public_id: uploadResult.public_id, url: uploadResult.url });
      setImageLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <div className="w-24 md:w-20 md:h-20 h-24 flex justify-center items-center rounded-full hover:opacity-50 border-gray-300 shadow-lg border-4 mb-[0.4rem]">
        {imageLoading ? (
            <CircularProgress />
        ) : (
          <div
            className="w-full h-full cursor-pointer"
            onClick={() => imageRef.current.click()}
          >
            <img
              src={profilePic ? profilePic.url : dummyPic}
              alt=""
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "100%",
              }}
            />
          </div>
        )}

        <input
          type="file"
          ref={imageRef}
          accept="image/*"
          multiple={false}
          hidden
          disabled={imageLoading}
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
};

export default ProfilePicUpload;
