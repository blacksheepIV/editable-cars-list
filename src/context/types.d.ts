import { CarsInfo } from "../types/types";

export type ListContextValueType = {
  list: CarsInfo[];
  setList: React.Dispatch<React.SetStateAction<CarsInfo[]>>;
  currentProduct: CarsInfo | null;
  setCurrentProduct: React.Dispatch<React.SetStateAction<CarsInfo | null>>;
};

export type ListProviderProps = {
  children: React.ReactNode;
};
