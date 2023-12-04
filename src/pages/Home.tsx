import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Home = () => {
  const { formData } = useSelector((store: RootState) => store.form);
  return (
    <section>
      {formData.length === 0 && "No Forms submitted yet"}
      {formData.map((form, index) => (
        <div
          key={index}
          className="flex flex-col gap-6 p-6  rounded-lg border-[2px] min-w-[400px]"
        >
          <div className="px-2 py-4 rounded-xl border-blue-500 border-[1px] text-s ">
            {form.name}
          </div>
          <div className="px-2 py-4 rounded-xl border-blue-500 border-[1px] text-s">
            {form.age}
          </div>
          <div className="px-2 py-4 rounded-xl border-blue-500 border-[1px] text-s">
            {form.email}
          </div>
          <div className="px-2 py-4 rounded-xl border-blue-500 border-[1px] text-s">
            {form.password}
          </div>
          <div className="px-2 py-4 rounded-xl border-blue-500 border-[1px] text-s">
            {form.gender}
          </div>
          <div className="px-2 py-4 rounded-xl border-blue-500 border-[1px] text-s">
            {form.acceptTC ? "T&C accepted" : "T&C not accepted"}
          </div>

          <img src={form.picture} className=" h-[300px]" />
          <div className="px-2 py-4 rounded-xl border-blue-500 border-[1px] text-s">
            {form.country.name}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Home;
