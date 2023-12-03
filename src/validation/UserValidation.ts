import * as Yup from "yup";

export interface typeFile {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
}
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
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{4,})/,
      "Password must contain at least 8 characters, including 1 number, 1 lowercase letter, 1 uppercase letter, and 1 special character",
    ),

  verifyPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),

  gender: Yup.string().required(),

  acceptTC: Yup.boolean()
    .required()
    .oneOf([true], "You must accept the Terms & Conditions"),

  country: Yup.string().required(),

  picture: Yup.mixed()
    .required()
    .required("Picture is required")
    .test("fileFormat", "Only PNG and JPEG are allowed.", (value: unknown) => {
      const myValueList = value as typeFile[];
      if (myValueList.length) {
        return (
          myValueList[0].type === "image/png" ||
          myValueList[0].type === "image/jpeg"
        );
      } else {
        return false;
      }
    })
    .test(
      "fileSize",
      "File size is too large. Maximum 5MB.",
      (value: unknown) => {
        const myValueList = value as typeFile[];
        if (myValueList.length) {
          return myValueList[0].size <= 5 * 1024 * 1024;
        } else {
          return false;
        }
      },
    ),
});
