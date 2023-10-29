import React from "react";
import { TypeSearchSectionProps, TypeSearchSectionState } from "./types";

class SearchSection extends React.Component<
  TypeSearchSectionProps,
  TypeSearchSectionState
> {
  render() {
    return (
      <section>
        <input
          value={this.props.searchValue}
          onChange={(e) => this.props.onChangeValue(e.target.value)}
        />
        <button
          disabled={!this.props.searchValue.trim()}
          onClick={this.props.onSearch}
        >
          search
        </button>
      </section>
    );
  }
}

export default SearchSection;
