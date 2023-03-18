export interface CarsInfo {
  ID: number;
  CARID: string;
  INSTOCK: boolean;
  HP: number;
  PRICE: string;
  COLOR: string;
  COLORS?: string[];
}

export interface DataRow extends CarsInfo {
  EDIT?: any;
}
