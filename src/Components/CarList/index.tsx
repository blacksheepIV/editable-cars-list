import { FC, useState, useEffect, useContext } from "react";
import axios from "axios";
import DataTable, { TableColumn } from "react-data-table-component";
import Modal from "react-modal";
import { ListContext } from "../../context/ListContext";

import Button from "../Button";
import Form from "../Form";

import "./CarList.css";

import type { CarsInfo, DataRow } from "../../types/types";

const baseURL = process.env.REACT_APP_API_URL;

const CarList: FC = () => {
  const [error, setError] = useState<boolean>(false);
  const { list, setList, setCurrentProduct } = useContext(ListContext);

  async function getCarsInfo(): Promise<void> {
    try {
      let res = await axios.get<CarsInfo[]>(`${baseURL}cars`);
      setList(res.data);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }

  useEffect(() => {
    if (list && list.length === 0) {
      console.log("bello", list);
      getCarsInfo();
    }
  }, [list, setList]);

  const columns: TableColumn<DataRow>[] = [
    {
      name: "ID",
      selector: (row) => row.ID
    },
    {
      name: "CARID",
      id: "CARID",
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
      format: (row) => (
        <Button size="small" onClick={() => editProduct(row)}>
          Edit
        </Button>
      )
    }
  ];

  function editProduct(product: CarsInfo) {
    setCurrentProduct(product);
    setIsOpen(true);
  }
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

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      {!error && (
        <>
          <DataTable
            columns={columns}
            data={list}
            striped={true}
            highlightOnHover={true}
            pagination={true}
            paginationPerPage={10}
            customStyles={customStyles}
          />
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <Form closeForm={closeModal} />
          </Modal>
        </>
      )}
    </>
  );
};

export default CarList;
