export type Input = {
  value?: string;
  label: string;
  isDisabled: boolean;
  type?: string;
};
export type Checkbox = {
  checked: boolean;
} & Pick<Input, "label" | "isDisabled">;

export type RadioButton = {
  values: string[];
  selected: string;
} & Pick<Input, "label" | "isDisabled">;

export type FormProps = {
  closeForm: () => void;
};

export interface IFormValues {
  searchType: string;
  searchQuery: string;
}
