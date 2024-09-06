import { v2 as cloudinary } from "cloudinary";
import Listing from "../model/listingModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createListing = async (req, res, next) => {
  try {
    const {
      title,
      description,
      address,
      type,
      bathroom,
      bedroom,
      furnished,
      parking,
      regularPrice,
      offer,
      discountedPrice,
    } = req.body;

    console.log(req.body);

    const images = JSON.parse(req.body.images);
    console.log(images);

    const savedListing = await Listing.create({
      title,
      description,
      address,
      bedroom,
      bathroom,
      furnished,
      parking,
      type,
      regularPrice,
      images,
      offer,
      discountedPrice: offer === true ? discountedPrice : regularPrice,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      listing: savedListing,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a listing
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(new ErrorHandler("No Such Listing exists", 404));
    }
    await Promise.all(
      listing.images?.map(async (i) => {
        await cloudinary.uploader.destroy(i.public_id);
      })
    );
    await Listing.findByIdAndDelete(req.params.id);

    const listings = await Listing.find({ owner: req.user._id });

    res.status(200).json({
      success: true,
      listings,
    });
  } catch (error) {
    next(error);
  }
};

// Update a Listing.
export const updateListing = async (req, res, next) => {
  try {
    req.body.images = JSON.parse(req.body.images);

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      listing: updatedListing,
    });
  } catch (error) {
    next(error);
  }
};
