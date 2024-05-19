import React from "react";

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  children?: React.ReactNode;
  color?: string;
  backgroundColor?: string;
}
const buttonStyle = "default-button";
const Button: React.FC<ButtonProps> = ({
  text = "Button",
  onClick,
  className = buttonStyle,
  disabled = false,
  type = "button",
  style,
  children,
  color,
  backgroundColor,
}) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{ ...style, color: color, backgroundColor: backgroundColor }}
    >
      {children}
    </button>
  );
};

export default Button;
