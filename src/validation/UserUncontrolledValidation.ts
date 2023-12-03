import * as Yup from "yup";

export const nameSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Z][a-z]*$/, "Do not have 1st letter as Upeercase letter"),
});

export const ageSchema = Yup.object().shape({
  age: Yup.number()
    .required("Age is required")
    .positive("Age should be a positive number")
    .integer("Age should be a whole number"),
});

export const emailSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
});

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password must contain at least 8 characters, including 1 number, 1 lowercase letter, 1 uppercase letter, and 1 special character",
    ),

  verifyPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const genderSchema = Yup.object().shape({
  gender: Yup.string().required("Gender is required"),
});

export const acceptTCSchema = Yup.object().shape({
  acceptTC: Yup.boolean().oneOf(
    [true],
    "You must accept the Terms & Conditions",
  ),
});

export const pictureSchema = Yup.object().shape({
  picture: Yup.string().required(),
});

export const countrySchema = Yup.object().shape({
  country: Yup.string().required("Country is required"),
});
