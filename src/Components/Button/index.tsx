import React from "react";
import classNames from "classnames";
import "./Button.css";

import type { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  type = "button",
  disabled = false,
  size = "medium",
  layout = "primary",
  loading = false,
  className,
  children,
  ...other
}) => {
  const classes = classNames(
    "button",
    `button--${size}`,
    `button--${layout}`,
    className
  );
  return (
    <button className={classes} disabled={disabled} {...other}>
      {children}
    </button>
  );
};

export default Button;
