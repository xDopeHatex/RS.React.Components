import { TypeDataSectionProps } from "../types/types";
import { IMGAGE_URL } from "../constants/constants";
import { useItems } from "../store/StoreContext";

import Loader from "./Loader";

const DataSection = ({
  curPage,
  isLoading,
  option,

  handleDetails,
}: TypeDataSectionProps) => {
  const data = useItems();

  return (
    <div className="bg-red-200 rounded-xl flex flex-col  text-lg font-medium relative max-h-[60vh] overflow-y-scroll">
      <div>
        {!isLoading &&
          data.map((item, index) => {
            return (
              <button
                className="px-4 py-2 cursor-pointer"
                key={item.id}
                onClick={() => handleDetails(item.id)!}
              >
                {item.title}
                <img src={`${IMGAGE_URL}${item.poster_path}`} />
              </button>
            );
          })}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default DataSection;
