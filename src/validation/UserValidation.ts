import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .matches(/^[A-Z][a-z]*$/),
  age: Yup.number()
    .required("Age is required")
    .positive("Age should be a positive number")
    .integer("Age should be a whole number"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),

  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password must contain at least 8 characters, including 1 number, 1 lowercase letter, 1 uppercase letter, and 1 special character",
    ),

  verifyPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),

  gender: Yup.string().required("Gender is required"),

  acceptTC: Yup.boolean().oneOf(
    [true],
    "You must accept the Terms & Conditions",
  ),

  picture: Yup.mixed()
    .required("Picture is required")
    .test(
      "fileFormat",
      "Invalid file format. Only PNG and JPEG are allowed.",
      (value: any) =>
        value && (value.type === "image/png" || value.type === "image/jpeg"),
    )
    .test(
      "fileSize",
      "File size is too large. Maximum allowed size is 5MB.",
      (value: any) => value && value.size <= 5 * 1024 * 1024,
    ),

  country: Yup.string().required("Country is required"),
});
