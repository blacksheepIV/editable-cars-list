export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  size?: "large" | "medium" | "small";
  children: React.ReactNode;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  layout?: "primary" | "transparent";
  tooltip?: string;
  loading?: boolean;
}
