import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { RootState } from "../store/store";
import { submitForm } from "../store/formSlice";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";

function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

import {
  nameSchema,
  passwordSchema,
  ageSchema,
  emailSchema,
  pictureSchema,
  acceptTCSchema,
} from "../validation/UserUncontrolledValidation";

const Uncontrolled = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const verifyPasswordRef = useRef<HTMLInputElement | null>(null);
  const genderRef = useRef<HTMLSelectElement | null>(null);
  const acceptRef = useRef<HTMLInputElement | null>(null);
  const pictureRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLSelectElement | null>(null);

  const dispatch = useDispatch();
  const { countriesList } = useSelector((store: RootState) => store.form);

  const [nameError, setNameError] = useState<String>("");
  const [ageError, setAgeError] = useState<String>("");
  const [emailError, setEmailError] = useState<String>("");
  const [passwordError, setPasswordError] = useState<String>("");

  const [acceptError, setAcceptError] = useState<String>("");
  const [pictureError, setPicturesError] = useState<String>("");

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current?.value?.trim(),
      age: parseInt(ageRef.current?.value!, 10),
      email: emailRef.current?.value?.trim(),
      password: passwordRef.current?.value?.trim(),
      verifyPassword: verifyPasswordRef.current?.value?.trim(),
      gender: genderRef.current?.value?.trim(),
      acceptTC: acceptRef.current?.checked,
      picture: "sd",
      country: { name: countryRef.current?.value?.trim(), id: 2 },
    };

    const file =
      pictureRef.current?.files && pictureRef.current?.files[0]
        ? pictureRef.current?.files[0]
        : undefined;

    let myFile;
    if (file) {
      myFile = (await getBase64(file)) as string;
    }

    try {
      await nameSchema.validate({
        name: formData.name,
      });
      setNameError("");
    } catch (err) {
      const error = err as { errors: string[] };
      setNameError(error.errors[0]);
    }

    try {
      await ageSchema.validate({
        age: formData.age,
      });
      setAgeError("");
    } catch (err) {
      const error = err as { errors: string[] };
      setAgeError(error.errors[0]);
    }

    try {
      await emailSchema.validate({
        email: formData.email,
      });
      setEmailError("");
    } catch (err) {
      const error = err as { errors: string[] };
      setEmailError(error.errors[0]);
    }

    try {
      await passwordSchema.validate({
        password: formData.password,
        verifyPassword: formData.verifyPassword,
      });
      setPasswordError("");
    } catch (err) {
      const error = err as { errors: string[] };
      setPasswordError(error.errors[0]);
    }

    try {
      await pictureSchema.validate({
        picture: myFile,
      });
      setPicturesError("");
    } catch (err) {
      const error = err as { errors: string[] };
      setPicturesError(error.errors[0]);
    }

    try {
      await acceptTCSchema.validate({
        acceptTC: formData.acceptTC,
      });
      setAcceptError("");
    } catch (err) {
      const error = err as { errors: string[] };
      setAcceptError(error.errors[0]);
    }

    formData.picture = myFile as string;

    if (
      !!formData.name &&
      !!formData.age &&
      !!formData.email &&
      formData.password === formData.verifyPassword &&
      formData.acceptTC &&
      !!formData.picture
    ) {
      dispatch(submitForm(formData));
      navigate("/");
    }
  };

  return (
    <section className=" p-6  rounded-lg border-[2px]">
      <h1 className="text-2xl text-green-700 ">Form</h1>
      <form className="flex flex-col gap-10 pt-10" onSubmit={onSubmitHandler}>
        <div className="flex flex-col relative">
          <label htmlFor="name">Name</label>
          <input
            ref={nameRef}
            id="name"
            className={`rounded-xl py-2 border-[1px] px-2  ${
              nameError ? "border-red-500" : "border-blue-500"
            }`}
          />
          {nameError && (
            <div className="text-red-500 text-sm absolute bottom-[-20px]">
              {nameError}
            </div>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="age">Age</label>
          <input
            defaultValue={0}
            ref={ageRef}
            id="age"
            type="number"
            className={`rounded-xl py-2 border-[1px] px-2  ${
              ageError ? "border-red-500" : "border-blue-500"
            }`}
          />
          {ageError && (
            <div className="text-red-500 text-sm absolute bottom-[-40px]">
              {ageError}
            </div>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            id="email"
            className={`rounded-xl py-2 border-[1px] px-2  ${
              emailError ? "border-red-500" : "border-blue-500"
            }`}
          />
          {emailError && (
            <div className="text-red-500 text-sm absolute bottom-[-20px]">
              {emailError}
            </div>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            ref={passwordRef}
            id="password"
            className={`rounded-xl py-2 border-[1px] px-2  ${
              passwordError ? "border-red-500" : "border-blue-500"
            }`}
          />
          {passwordError && (
            <div className="text-red-500 text-sm absolute bottom-[-20px]">
              {passwordError}
            </div>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="verifyPassword"> Confirm Password</label>
          <input
            type="password"
            ref={verifyPasswordRef}
            id="verifyPassword"
            className={`rounded-xl py-2 border-[1px] px-2  ${
              passwordError ? "border-red-500" : "border-blue-500"
            }`}
          />
          {passwordError && (
            <div className="text-red-500 text-sm absolute bottom-[-20px]">
              {passwordError}
            </div>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="gender"> Gender</label>
          <select
            ref={genderRef}
            name="gender"
            id="gender"
            className={`rounded-xl py-2 border-[1px] px-2  
             border-blue-500`}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="accept"> accept T&C</label>
          <input
            defaultChecked={false}
            ref={acceptRef}
            id="accept"
            type="checkbox"
            className={`rounded-xl py-2 border-[1px] px-2  ${
              acceptError ? "border-red-500" : "border-blue-500"
            }`}
          />
          {acceptError && (
            <div className="text-red-500 text-sm absolute bottom-[-20px]">
              {acceptError}
            </div>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="verifyPassword"> Upload Picture</label>
          <input
            type="file"
            ref={pictureRef}
            id="picture"
            className={`rounded-xl py-2 border-[1px] px-2  ${
              pictureError ? "border-red-500" : "border-blue-500"
            }`}
          />
          {pictureError && (
            <div className="text-red-500 text-sm absolute bottom-[-20px]">
              {pictureError}
            </div>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="countries">Countries</label>
          <select
            ref={countryRef}
            name="countries"
            id="countries"
            className={`rounded-xl py-2 border-[1px] px-2  
             border-blue-500`}
          >
            {countriesList.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <button className="py-3 px-5 rounded-xl text-white bg-violet-500">
          Submit
        </button>
      </form>
    </section>
  );
};

export default Uncontrolled;
