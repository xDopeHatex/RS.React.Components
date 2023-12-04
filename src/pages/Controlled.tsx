import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { RootState } from "../store/store";
import { submitForm } from "../store/formSlice";
import { userSchema } from "../validation/UserValidation";
import { useNavigate } from "react-router-dom";
import { ResolverOptions } from "react-hook-form";

import { useForm, SubmitHandler } from "react-hook-form";

function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

type typeSubmitData = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  acceptTC: boolean;
  picture: [file: Blob];
  verifyPassword: string;
  country: string;
};

const Controlled = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<typeSubmitData>({
    resolver: yupResolver(userSchema) as
      | ResolverOptions<typeSubmitData>
      | undefined,
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { countriesList } = useSelector((store: RootState) => store.form);

  const onSubmit: SubmitHandler<typeSubmitData> = async (data) => {
    const file = data?.picture[0] as Blob;

    const myFile = (await getBase64(file)) as string;

    const modifiedData = {
      ...data,
      picture: myFile,
      country: { name: data.country, id: 42 },
    };

    dispatch(submitForm(modifiedData));
    navigate("/");
    reset();
  };

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
            {...register("name")}
            id="name"
            className={`rounded-xl py-2 border-[1px] px-2  ${
              errors?.name ? "border-red-500" : "border-blue-500"
            } `}
          />
          {errors?.name && (
            <div className="text-red-500 text-sm absolute bottom-[-20px]">
              {errors?.name?.message}
            </div>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="age">Age</label>
          <input
            defaultValue={0}
            {...register("age")}
            id="age"
            type="number"
            className={`rounded-xl py-2 border-[1px] px-2 ${
              errors?.age ? "border-red-500" : "border-blue-500"
            }`}
          />
          {errors?.age && (
            <div className="text-red-500 text-sm absolute bottom-[-40px]">
              {errors?.age?.message}
            </div>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            id="email"
            className={`rounded-xl py-2 border-[1px] px-2 ${
              errors?.email ? "border-red-500" : "border-blue-500"
            }`}
          />
          {errors?.email?.message && (
            <div className="text-red-500 text-sm absolute bottom-[-20px]">
              {errors?.email?.message}
            </div>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password")}
            id="password"
            className={`rounded-xl py-2 border-[1px] px-2 ${
              errors?.password ? "border-red-500" : "border-blue-500"
            } `}
          />
          {errors?.password && (
            <div className="text-red-500 text-xs absolute bottom-[-20px]">
              {errors?.password?.message}
            </div>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="verifyPassword"> Confirm Password</label>
          <input
            type="password"
            {...register("verifyPassword")}
            id="verifyPassword"
            className={`rounded-xl py-2 border-[1px] px-2 ${
              errors?.verifyPassword ? "border-red-500" : "border-blue-500"
            } `}
          />
          {errors?.password && (
            <div className="text-red-500 text-xs absolute bottom-[-20px]">
              {errors?.verifyPassword?.message}
            </div>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="gender"> Gender</label>
          <select
            {...register("gender")}
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
            {...register("acceptTC")}
            id="accept"
            type="checkbox"
            className={`rounded-xl py-2 border-[1px] px-2 ${
              errors?.acceptTC ? "border-red-500" : "border-blue-500"
            }`}
          />
          {errors?.acceptTC && (
            <div className="text-red-500 text-sm absolute bottom-[-20px]">
              {errors?.acceptTC?.message}
            </div>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="picture"> Upload Picture</label>
          <input
            type="file"
            {...register("picture")}
            id="picture"
            className={`rounded-xl py-2 border-[1px] px-2 ${
              errors?.picture ? "border-red-500" : "border-blue-500"
            } `}
          />
          {errors?.picture && (
            <div className="text-red-500 text-sm absolute bottom-[-20px]">
              {errors?.picture?.message}
            </div>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="countries">Countries</label>
          <select
            {...register("country")}
            defaultValue="Afghanistan"
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
        <button
          className={` py-3 px-5 rounded-xl text-white  ${
            !!Object.keys(errors).length ? "bg-slate-500" : "bg-violet-500"
          }`}
          disabled={!!Object.keys(errors).length}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Controlled;
