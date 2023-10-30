import React from "react";
import { TypeDataSectionProps, TypeDataSectionState } from "../types/types";

import Loader from "./Loader";

class DataSection extends React.Component<
  TypeDataSectionProps,
  TypeDataSectionState
> {
  render() {
    return (
      <div className="bg-red-200 rounded-xl flex flex-col  text-lg font-medium relative">
        <div>
          {!this.props.isLoading &&
            this.props.searchArray.map((item) => {
              return (
                <div className="px-4 py-2" key={item.id}>
                  {item.name}
                </div>
              );
            })}
        </div>
        {this.props.isLoading && <Loader />}
      </div>
    );
  }
}

export default DataSection;
