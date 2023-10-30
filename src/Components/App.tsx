import { Component } from "react";
import TestErrorBoundaryButton from "./TestErrorBoundaryButton";
import { URL } from "../constants/constants";
import { TypeAppComponentProps, TypeAppComponentState } from "../types/types";
import DataSection from "./DataSection";
import SearchSection from "./SearchSection";

class App extends Component<TypeAppComponentProps, TypeAppComponentState> {
  state = {
    searchValue: "",
    data: [],
    isFetchingData: false,
  };

  searchingValue = (value: string) => {
    this.setState({ searchValue: value });
  };

  searchingHandler = () => {
    const keyWord = this.state.searchValue.trim();
    if (keyWord) {
      this.fetchData(keyWord);
    }
    localStorage.setItem("keyWord", keyWord);
  };

  fetchData = (keyWord: string = "", limit = 10, pageNumber = 0) => {
    this.setState({ ...this.state, isFetchingData: true });
    let url;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (keyWord) {
      url = `${URL}/search/users?per_page=${limit}&page=${pageNumber}&q=${keyWord}`;
    } else {
      url = `${URL}/search/users?per_page=${limit}&page=${pageNumber}`;
    }

    fetch(url, { method: "GET", headers: myHeaders })
      .then((response) => response.json())
      .then(
        (result: {
          items: { id: number; login: string }[];
          message: string;
        }) => {
          if (result.message) {
            alert(
              `SORRY, but you clicked a lot! so server wnat you to wait a few minutes and try again${result.message}`,
            );
          }
          this.setState({
            data: result.items.map((item) => ({
              id: item.id,
              name: item.login,
            })),
            searchValue: keyWord,
            isFetchingData: false,
          });
        },
      )
      .catch((error) => {
        this.setState({ isFetchingData: false });
        console.log("error", error);
      });

    return "";
  };

  componentDidMount() {
    const keyWord = localStorage.getItem("keyWord");
    if (keyWord) {
      this.fetchData(keyWord);
    }
  }

  render() {
    return (
      <div className="max-w-[600px] mx-auto pt-[10%] flex flex-col gap-y-20">
        <SearchSection
          searchValue={this.state.searchValue}
          onChangeValue={this.searchingValue}
          onSearch={this.searchingHandler}
        />
        <DataSection
          searchArray={this.state.data}
          isLoading={this.state.isFetchingData}
        />
        <TestErrorBoundaryButton />
      </div>
    );
  }
}
export default App;
