import React, { useState } from "react";
import ListingUpdateUi from "./ListingUpdateUi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCloudinaryDeleteSignature,
  getCloudinarySignature,
} from "utils/cloudinarySignature";
import { useEffect } from "react";
import { useUpdateListingMutation } from "../listingApi";
import LoadingBackdrop from "components/LoadingBackdrop";
import ErrorDisplay from "components/ErrorDisplay";

const ListingUpdate = () => {
  const { userListings } = useSelector((state) => state.profile);
  const { listingId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  const updatingListing = userListings.find(
    (listing) => listing._id === listingId
  );

  const [uploadedImages, setUploadedImages] = useState([]);
  const [updateListing, { isLoading, error }] = useUpdateListingMutation();

  const handleImagesUpload = async (e) => {
    try {
      const imageFiles = e.target.files;

      const { timestamp, signature } = await getCloudinarySignature();

      const imageUploadResponse = await Promise.all(
        Array.from(imageFiles, async (image) => {
          const imagesData = new FormData();

          imagesData.append("file", image);
          imagesData.append("timestamp", timestamp);
          imagesData.append("api_key", process.env.REACT_APP_CLOUD_API_KEY);
          imagesData.append("signature", signature);
          imagesData.append("folder", "Estate_Sphere");

          const cloudedImage = await fetch(process.env.REACT_APP_CLOUD_URL, {
            method: "POST",
            body: imagesData,
          });

          const listingImage = await cloudedImage.json();

          return {
            public_id: listingImage.public_id,
            url: listingImage.secure_url,
          };
        })
      );
      setUploadedImages((previmages) => [
        ...previmages,
        ...imageUploadResponse,
      ]);
    } catch (error) {}
  };

  const handleImageDelete = async (public_id) => {
    try {
      const { timestamp, signature } = await getCloudinaryDeleteSignature(
        public_id
      );

      const deleteData = new FormData();
      deleteData.append("public_id", public_id);
      deleteData.append("timestamp", timestamp);
      deleteData.append("api_key", process.env.REACT_APP_CLOUD_API_KEY);
      deleteData.append("signature", signature);
      deleteData.append("folder", "Estate_Sphere");

      await fetch(
        "https://api.cloudinary.com/v1_1/ayush-cloudinary/image/destroy",
        {
          method: "POST",
          body: deleteData,
        }
      );

      setUploadedImages(
        uploadedImages.filter((image) => image.public_id !== public_id)
      );
      console.log(uploadedImages);
    } catch (error) {}
  };

  const handleListingUpdate = async (values) => {
    try {
      const formData = new FormData();
      const valueProps = Object.keys(values);

      valueProps.forEach(async (value) => {
        formData.append(value, values[value]);
      });

      if (!uploadedImages) {
        alert("Images of listing is required");
      }

      formData.set("images", JSON.stringify(uploadedImages));

      const { data } = await updateListing({ id: listingId, body: formData });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    setUploadedImages(updatingListing?.images);
  }, [updatingListing]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error.data?.error);
    }
  }, [error]);

  return (
    <div className="w-full">
      {isLoading ? (
        <LoadingBackdrop openBackdrop={isLoading} />
      ) : error ? (
        <ErrorDisplay
          message={errorMessage}
          handleClose={() => setErrorMessage("")}
        />
      ) : (
        <ListingUpdateUi
          initialValues={updatingListing}
          imagesUpload={handleImagesUpload}
          uploadedImages={uploadedImages}
          deleteImage={handleImageDelete}
          submitLoading={isLoading}
          listingSubmit={handleListingUpdate}
        />
      )}
    </div>
  );
};

export default ListingUpdate;
