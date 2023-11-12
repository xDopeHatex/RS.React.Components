import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

import { TypeDataList, TypeDataItem } from "../types/types";

type SearchContextType = string;
type SearchUpdateContextType = Dispatch<SetStateAction<string>>;
type ItemsContextType = TypeDataList;
type ItemsUpdateContextType = Dispatch<SetStateAction<ItemsContextType>>;

const SearchContext = createContext<SearchContextType>("");
const SearchUpdateContext = createContext<SearchUpdateContextType>(() => {});
export const ItemsContext = createContext<ItemsContextType>([]);
const ItemsUpdateContext = createContext<ItemsUpdateContextType>(() => {});

const useSearch = () => {
  return useContext(SearchContext);
};

const useSearchUpdate = () => {
  return useContext(SearchUpdateContext);
};

const useItems = () => {
  return useContext(ItemsContext);
};

const useItemsUpdate = () => {
  return useContext(ItemsUpdateContext);
};

const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState<SearchContextType>("");
  const [itemsStore, setItemsStore] = useState<ItemsContextType>([]);

  return (
    <SearchContext.Provider value={searchKeyword}>
      <SearchUpdateContext.Provider value={setSearchKeyword}>
        <ItemsContext.Provider value={itemsStore}>
          <ItemsUpdateContext.Provider value={setItemsStore}>
            {children}
          </ItemsUpdateContext.Provider>
        </ItemsContext.Provider>
      </SearchUpdateContext.Provider>
    </SearchContext.Provider>
  );
};

export { SearchProvider, useSearch, useSearchUpdate, useItems, useItemsUpdate };
