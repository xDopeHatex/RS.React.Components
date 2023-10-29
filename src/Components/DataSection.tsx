import React from "react";
import { TypeDataSectionProps, TypeDataSectionState } from "./types";

import Loader from "./Loader";

class DataSection extends React.Component<
  TypeDataSectionProps,
  TypeDataSectionState
> {
  render() {
    return (
      <div className="bg-red-200">
        {this.props.searchArray.map((item) => {
          return <div key={item.id}>{item.name}</div>;
        })}
        {this.props.isLoading && <Loader />}
      </div>
    );
  }
}

export default DataSection;
