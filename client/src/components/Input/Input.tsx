import React, { InputHTMLAttributes, forwardRef } from "react";
import styles from "./styles.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // custom properties go here
  placeholder: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, id, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        <input
          ref={ref}
          {...props}
          id={id}
          placeholder=" " // ! for styling
          autoComplete="off"
        />
        <label htmlFor={id}>{placeholder}</label>
      </div>
    );
  }
);

export default Input;
