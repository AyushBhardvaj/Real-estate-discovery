import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import Checkbox from "components/Checkbox";
import { Formik } from "formik";
import React, { useRef } from "react";
import { listingSchemaValidation } from "utils/validationSchema";
import ImageDisplay from "./ImageDisplay";

const ListingUpdateUi = ({
  initialValues,
  listingSubmit,
  imagesUpload,
  uploadedImages,
  deleteImage,
}) => {
  const imageRef = useRef();
  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        onSubmit={listingSubmit}
        validationSchema={listingSchemaValidation}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="w-full flex flex-col lg:flex-row lg:gap-8">
                <div className=" w-full flex flex-col gap-7 pb-7">
                  <div className="relative">
                    <input
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Title..."
                      className="w-full h-12 bg-white rounded-md border focus:outline-none placeholder:text-gray-500 px-4"
                    />
                    {touched.title && errors.title && (
                      <p className="absolute text-sm text-red-600 ml-2">
                        {errors.title}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <textarea
                      rows="4"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Description..."
                      className="w-full bg-white rounded-md border focus:outline-none placeholder:text-gray-500 px-4 py-2"
                    />
                    {touched.description && errors.description && (
                      <p className=" absolute text-sm text-red-600 ml-2">
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Address..."
                      className="w-full h-12 bg-white rounded-md border focus:outline-none placeholder:text-gray-500 px-4"
                    />
                    {touched.address && errors.address && (
                      <p className=" absolute text-sm text-red-600 ml-2">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <div className="flex gap-10">
                      <Checkbox
                        type="radio"
                        labelName="Sell"
                        name="type"
                        value="sell"
                        isChecked={values.type === "sell"}
                        onChange={handleChange}
                      />
                      <Checkbox
                        type="radio"
                        labelName="Rent"
                        name="type"
                        value="rent"
                        isChecked={values.type === "rent"}
                        onChange={handleChange}
                      />
                    </div>
                    {touched.type && errors.type && (
                      <p className=" absolute text-sm text-red-600 ml-2">
                        {errors.type}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <div className="relative">
                      <div className="flex gap-2 items-center">
                        <input
                          type="number"
                          name="bedroom"
                          min="1"
                          step="1"
                          value={values.bedroom}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-[5rem] h-12 bg-white rounded-md border focus:outline-none placeholder:text-gray-500 px-4"
                        />
                        <label htmlFor="bedroom" className="font-normal">
                          Beds
                        </label>
                      </div>
                      {touched.bedroom && errors.bedroom && (
                        <p className=" absolute text-sm text-red-600 ml-2">
                          {errors.bedroom}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <div className=" flex gap-2 items-center">
                        <input
                          type="number"
                          name="bathroom"
                          min="1"
                          step="1"
                          value={values.bathroom}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-[5rem] h-12 bg-white rounded-md border focus:outline-none placeholder:text-gray-500 px-4"
                        />
                        <label htmlFor="bathroom" className=" font-normal">
                          Baths
                        </label>
                      </div>
                      {touched.bathroom && errors.bathroom && (
                        <p className=" absolute text-sm text-red-600 ml-2">
                          {errors.bathroom}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <div className=" w-[10rem]">
                      <FormControl fullWidth>
                        <InputLabel>Furnishing</InputLabel>
                        <Select
                          sx={{ width: "100%", backgroundColor: "white" }}
                          value={values.furnished}
                          onChange={handleChange}
                          label="Furnishing"
                          name="furnished"
                        >
                          <MenuItem value="unfurnished">Unfurnished</MenuItem>
                          <MenuItem value="semi-furnished">
                            Semi-furnished
                          </MenuItem>
                          <MenuItem value="full-furnished">
                            Fully-furnished
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    {touched.furnished && errors.furnished && (
                      <p className=" absolute text-sm text-red-600 ml-2">
                        {errors.furnished}
                      </p>
                    )}
                  </div>
                  <div className=" flex gap-10">
                    <Checkbox
                      labelName="Parking Slot"
                      name="parking"
                      isChecked={values.parking}
                      onChange={handleChange}
                      type="checkbox"
                    />
                    <Checkbox
                      labelName="Offer"
                      name="offer"
                      isChecked={values.offer}
                      onChange={handleChange}
                      type="checkbox"
                    />
                  </div>

                  <div className=" gap-4 flex">
                    <div className="relative">
                      <div className=" flex items-start sm:items-center lg:items-start xl:items-center gap-2">
                        <div>
                          <input
                            type="number"
                            name="regularPrice"
                            min="1"
                            step="1"
                            value={values.regularPrice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-[7rem] h-12 bg-white rounded-md border focus:outline-none placeholder:text-gray-500 px-4"
                          />
                        </div>
                        <label
                          htmlFor="regularPrice"
                          className=" font-normal flex flex-col"
                        >
                          Regular Price{" "}
                          <span className=" text-[0.8rem] self-start text-gray-500">
                            ($/month)
                          </span>
                        </label>
                      </div>
                      {touched.regularPrice && errors.regularPrice && (
                        <p className=" absolute text-sm text-red-600 ml-2">
                          {errors.regularPrice}
                        </p>
                      )}
                    </div>

                    {values.offer && (
                      <div className="relative">
                        <div className=" flex items-start sm:items-center lg:items-start 2xl:items-center gap-2">
                          <div>
                            <input
                              type="number"
                              name="discountedPrice"
                              min="1"
                              step="1"
                              value={values.discountedPrice}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="w-[7rem] h-12 bg-white rounded-md border focus:outline-none placeholder:text-gray-500 px-4"
                            />
                          </div>
                          <label
                            htmlFor="discountedPrice"
                            className=" font-normal flex flex-col"
                          >
                            Discounted Price{" "}
                            <span className=" text-[0.8rem] self-start  text-gray-500">
                              ($/month)
                            </span>
                          </label>
                        </div>
                        {touched.discountedPrice && errors.discountedPrice && (
                          <p className=" text-red-600">
                            {errors.discountedPrice}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className=" w-full flex flex-col gap-7">
                  <div className=" flex flex-col gap-3">
                    <h6 className=" font-semibold">
                      Images:{" "}
                      <span className=" font-normal text-gray-600">
                        The first image will be the cover (max 6)
                      </span>
                    </h6>
                  </div>
                  <div className="w-full h-[20rem] flex justify-start items-center border border-black rounded-md bg-white p-4">
                    <div className=" w-full h-full grid grid-cols-3 grid-rows-2 gap-3">
                      {uploadedImages?.map((pic, index) => {
                        return (
                          <ImageDisplay
                            pic={pic}
                            index={index}
                            deleteImage={deleteImage}
                          />
                        );
                      })}
                      {uploadedImages?.length < 6 && (
                        <div
                          onClick={() => imageRef.current.click()}
                          className="w-full h-full flex flex-col gap-2 justify-center items-center bg-gray-200 hover:bg-gray-300 border-4 border-dashed border-blue-500 rounded-lg relative cursor-pointer"
                        >
                          <IconPlus stroke={4} color="#757575" />
                          <p className=" text-lg font-medium text-gray-600">
                            More Images
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        ref={imageRef}
                        hidden
                        multiple
                        onChange={imagesUpload}
                        className=" w-full h-full hover:bg-slate-200 border border-gray-300 rounded-sm py-2 px-3"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-700 hover:bg-slate-700 focus:bg-slate-900 text-white text-[1.1rem] lg:text-[1.25rem] font-semibold rounded-md py-2 lg:py-[0.65rem]"
                    >
                      Update Listing
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ListingUpdateUi;
