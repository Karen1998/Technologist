import React, { FC, ReactNode } from "react";
import styles from "./Button.module.scss";

interface IProps {
  onClick: () => void;
  children: ReactNode;
}

const Button: FC<IProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={styles.root}>
      {children}
    </button>
  );
};

export default Button;
