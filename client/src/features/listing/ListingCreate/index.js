import React, { useEffect } from "react";
import ListingForm from "./ListingCreateUi";
import { useState } from "react";
import LoadingBackdrop from "components/LoadingBackdrop";
import ErrorDisplay from "components/ErrorDisplay";
import { getCloudinarySignature } from "utils/cloudinarySignature";
import { useCreateListingMutation } from "../listingApi";

const initialValues = {
  title: "",
  description: "",
  address: "",
  regularPrice: "",
  offer: false,
  discountedPrice: "",
  bathroom: 1,
  bedroom: 1,
  furnished: "",
  parking: false,
  type: "",
};

const ListingCreate = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [createListing, { error, isLoading }] = useCreateListingMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateLisitng = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      const valueProps = Object.keys(values);

      valueProps.forEach(async (value) => {
        formData.append(value, values[value]);
      });

      if (!uploadedImages) {
        return setErrorMessage("Images of listing is required");
      }

      const { timestamp, signature } = await getCloudinarySignature();

      const uploadResponse = await Promise.all(
        uploadedImages.map(async (image) => {
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

      formData.append("images", JSON.stringify(uploadResponse));

      const { data } = await createListing(formData);

      resetForm();
      setUploadedImages([]);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleImagesUpload = (e) => {
    const imageFiles = e.target.files;
    Array.from(imageFiles, (imageFile) => {
      setUploadedImages((previmages) => [...previmages, imageFile]);
    });
  };

  const handleDeleteImage = (index) => {
    setUploadedImages((previmages) =>
      previmages.filter((image) => image !== previmages[index])
    );
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error.data?.error);
    }
  }, [error]);

  return (
    <div className="w-full h-full relative">
      {isLoading ? (
        <LoadingBackdrop openBackdrop={isLoading} />
      ) : error ? (
        <ErrorDisplay
          message={errorMessage}
          handleClose={() => setErrorMessage("")}
        />
      ) : (
        <ListingForm
          initialValues={initialValues}
          listingSubmit={handleCreateLisitng}
          imagesUpload={handleImagesUpload}
          uploadedImages={uploadedImages}
          deleteImage={handleDeleteImage}
        />
      )}
    </div>
  );
};

export default ListingCreate;
