import { FC, useState, useEffect } from "react";
import axios from "axios";
import DataTable, { TableColumn } from "react-data-table-component";

import Button from "../Button/index";
import "./CarList.css";
import type { CarsInfo, DataRow } from "../../types/types";

const baseURL = process.env.REACT_APP_API_URL;

const CarList: FC = () => {
  const [data, setData] = useState<CarsInfo[]>([]);
  const [error, setError] = useState<boolean>(false);

  async function getCarsInfo(): Promise<void> {
    try {
      let res = await axios.get<CarsInfo[]>(`${baseURL}cars`);
      setData(res.data);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }

  useEffect(() => {
    getCarsInfo();
  }, []);

  const columns: TableColumn<DataRow>[] = [
    {
      name: "CARID",

      selector: (row) => row.CARID
    },
    {
      name: "INSTOCK",

      selector: (row) => JSON.stringify(row.INSTOCK)
    },
    {
      name: "HP",

      selector: (row) => row.HP
    },
    {
      name: "PRICE",

      selector: (row) => row.PRICE
    },
    {
      name: "COLOR",
      selector: (row) => row.COLOR,
      format: (row) => (
        <div className="color__wrapper">
          <span className="color__text">{row.COLOR}</span>
          <div
            className="color__sample"
            style={{ backgroundColor: row.COLOR }}
          ></div>
        </div>
      )
    },
    {
      name: "Edit",

      selector: (row) => row.EDIT,
      format: () => <Button size="small">Edit</Button>
    }
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#2563eb",
        color: "#e5e7eb",
        fontSize: "medium",
        fontWeight: "800"
      }
    },
    rows: {
      style: {
        borderLeft: "1px solid #c7c7c7",
        borderRight: "1px solid #c7c7c7",
        height: "50px"
      }
    },
    cells: {
      style: {
        fontSize: "medium"
      }
    }
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      fixedHeader={true}
      striped={true}
      highlightOnHover={true}
      pagination={true}
      paginationPerPage={10}
      customStyles={customStyles}
    />
  );
};

export default CarList;
