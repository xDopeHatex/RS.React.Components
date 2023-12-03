import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store/store";
import { submitForm } from "../store/formSlice";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}

function getBase64(file: any) {
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

const Controlled = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { countriesList } = useSelector((store: RootState) => store.form);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <section className=" p-6  rounded-lg border-[2px]">
      <h1 className="text-2xl text-green-700 ">Form</h1>
      <form
        className="flex flex-col gap-10 pt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
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

export default Controlled;
