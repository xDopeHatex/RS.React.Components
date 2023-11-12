import { TypeDataSectionProps } from "../types/types";

import { useItems } from "../store/StoreContext";
import Card from "./Card";

import Loader from "./Loader";

const DataSection = ({ isLoading, handleDetails }: TypeDataSectionProps) => {
  const data = useItems();

  return (
    <div className="bg-red-200 rounded-xl flex flex-col  text-lg font-medium relative max-h-[60vh] overflow-y-scroll">
      <div>
        {(!isLoading &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <Card key={item.id} item={item} handleDetails={handleDetails} />
            );
          })) ||
          (!isLoading && !data.length && (
            <div data-testid="nodata">There's no data, sorry</div>
          ))}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default DataSection;
