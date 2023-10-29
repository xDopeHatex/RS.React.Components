import React from "react";
import { TypeSearchSectionProps, TypeSearchSectionState } from "../types/types";

class SearchSection extends React.Component<
  TypeSearchSectionProps,
  TypeSearchSectionState
> {
  render() {
    return (
      <section>
        <h3 className="mb-3 font-semibold">
          Type here name of the github account and click search
        </h3>
        <div className="flex items-center">
          <input
            className="rounded-xl p-2 border-2 border-violet-300 focus:border-violet-700"
            value={this.props.searchValue}
            onChange={(e) => this.props.onChangeValue(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-violet-700 rounded-xl ml-10 text-white font-semibold text-xl transition-all hover:bg-violet-900"
            disabled={!this.props.searchValue.trim()}
            onClick={this.props.onSearch}
          >
            search
          </button>
        </div>
      </section>
    );
  }
}

export default SearchSection;
