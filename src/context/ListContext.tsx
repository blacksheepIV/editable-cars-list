import { createContext, useState } from "react";
import { CarsInfo } from "../types/types";
import { ListContextValueType, ListProviderProps } from "./types";

export const ListContext = createContext<ListContextValueType>(
  {} as ListContextValueType
);

const ListProvider: React.FC<ListProviderProps> = ({ children }) => {
  const [list, setList] = useState<CarsInfo[]>([]);
  const [currentProduct, setCurrentProduct] = useState<CarsInfo | null>(null);

  return (
    <ListContext.Provider
      value={{ list, setList, currentProduct, setCurrentProduct }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default ListProvider;
