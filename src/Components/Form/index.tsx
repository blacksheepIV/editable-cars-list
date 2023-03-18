import { FC, useContext, useState, forwardRef } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

import { ListContext } from "../../context/ListContext";
import Button from "../Button";
import { Input, Checkbox, RadioButton, FormProps } from "./types";
import "./Form.css";
import type { CarsInfo } from "../../types/types";

//TODO: refactor & make a seperate component for TextInput
const CustomInput = forwardRef<HTMLInputElement, Input>((props, ref) => {
  const { label, type, isDisabled, ...rest } = props;

  return (
    <div className="form__inputGroup">
      <label htmlFor={label} className="form__label">
        {label}
      </label>

      <input
        className="form__input"
        ref={ref}
        id={label}
        type={type}
        disabled={isDisabled}
        {...rest}
      />
    </div>
  );
});

//TODO:refactor & make a seperate component
const CheckboxInput: FC<Checkbox> = ({
  label,
  isDisabled = false,
  checked
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  function switchCheckbox() {
    setIsChecked(!isChecked);
  }

  return (
    <div className="form__checkboxGroup">
      <label htmlFor="vehicle1" className="form__label">
        {label}
      </label>
      <input
        type="checkbox"
        id={label}
        name={label}
        checked={isChecked}
        value={label}
        disabled={isDisabled}
        onChange={switchCheckbox}
      />
    </div>
  );
};

const RadioInput: FC<RadioButton> = ({
  values,
  selected,
  label,
  isDisabled
}) => {
  const template = values.map((value, index) => (
    <div className="form__radio">
      <label htmlFor="html">{value}</label>
      <input
        type="radio"
        key={`${value}-${index}`}
        id={`${value}-${index}`}
        name={label}
        defaultChecked={selected === label}
      />
    </div>
  ));
  return (
    <div className="radio__wrapper">
      <span className="form__label">{label}</span>
      <div className="form__radioGroup">{template}</div>
    </div>
  );
};

const Form: FC<FormProps> = ({ closeForm }) => {
  const { currentProduct, list, setList } = useContext(ListContext);

  const {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { isValid }
  } = useForm<CarsInfo>({
    mode: "all",
    defaultValues: currentProduct as CarsInfo
  });

  const onSearch: SubmitHandler<CarsInfo> = (data) => {
    const clonedList = JSON.parse(JSON.stringify(list));
    const updatedData = list.findIndex((item) => data.ID === item.ID);
    clonedList[updatedData] = data;
    console.log(clonedList);

    setList(clonedList);
    closeForm();
    console.log({ data });
  };
  return (
    <>
      <h3 className="form__title">Edit the car info:</h3>
      <div className="form__wrapper">
        <form className="form" onSubmit={handleSubmit(onSearch)}>
          <CustomInput
            label="ID"
            isDisabled={true}
            value={String(currentProduct?.ID) || "0"}
          />
          <CustomInput
            label="CARID"
            isDisabled={true}
            value={currentProduct?.CARID || "0"}
          />

          <CustomInput
            {...register("HP", {
              required: true,
              validate: (query) => query >= 100 && query <= 550
            })}
            label="HP"
            isDisabled={false}
            type="number"
          />

          <CustomInput
            {...register("PRICE", {
              required: true
            })}
            label="PRICE"
            isDisabled={false}
          />

          <Controller
            control={control}
            name="INSTOCK"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CheckboxInput
                checked={value || false}
                label="INSTOCK"
                isDisabled={false}
              />
            )}
          />

          <Controller
            control={control}
            name="COLORS"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <RadioInput
                label="COLORS"
                values={currentProduct?.COLORS || []}
                selected={currentProduct?.COLOR || ""}
                isDisabled={false}
              />
            )}
          />
          <div className="form__actionBar">
            <Button type="submit">Save</Button>
            <Button type="reset" layout="warning" onClick={closeForm}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
