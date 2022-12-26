import React, { FC, ReactNode } from "react";
import styles from "./Table.module.scss";

interface IProps {
  children: ReactNode;
}

const Table: FC<IProps> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default Table;
