import { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
};

export default Button;
