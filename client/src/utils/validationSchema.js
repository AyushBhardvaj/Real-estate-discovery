import * as yup from "yup";

export const listingSchemaValidation = yup.object({
  title: yup
    .string()
    .required("required")
    .min(2, "Minimum 2 letters are required"),
  description: yup
    .string()
    .required("required")
    .min(2, "Minimum 2 letters are required"),
  address: yup
    .string()
    .required("required")
    .min(2, "Minimum 2 letters are required"),
  regularPrice: yup
    .number()
    .required("required")
    .positive("Price can't be negative"),
  offer: yup.boolean(),
  discountedPrice: yup.number().positive("Price can't be negative"),
  bathroom: yup
    .number()
    .required("required")
    .positive("Rooms can't be negative")
    .integer("Rooms can't be in decimal")
    .min(1, "Wrong Input"),
  bedroom: yup
    .number()
    .required("required")
    .positive("Rooms can't be negative")
    .integer("Rooms can't be in decimal")
    .min(1, "Wrong Input"),
  furnished: yup.string().required("required"),
  parking: yup.boolean(),
  type: yup.string().required("required"),
});

export const signupSchemaValidation = yup.object({
  fullName: yup
    .string()
    .min(3, "minimum 3 letters are required")
    .required("required"),
  email: yup.string().email().required("required"),
  password: yup
    .string()
    .required("required")
    .min(5, "Minimum length should be 5"),
});

export const loginSchemaValidation = yup.object({
  email: yup.string().email("Invalid email").required("required"),
  password: yup
    .string()
    .required("required")
    .min(5, "Minimum length should be 5"),
});

export const updateProfileSchemaValidation = yup.object({
  fullName: yup
    .string()
    .min(3, "minimum 3 letters are required")
    .required("required"),
  email: yup.string().email().required("required"),
  password: yup.string().min(5, "Minimum length should be 5"),
});
