import React, { FC } from "react";
import styles from "../../Table.module.scss";

interface IProps {
  children: React.ReactNode;
}

const TableData: FC<IProps> = ({ children }) => {
  return <div className={styles.tableData}>{children}</div>;
};

export default TableData;
