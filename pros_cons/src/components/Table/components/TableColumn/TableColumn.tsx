import React, { FC, ReactNode } from "react";
import styles from "../../Table.module.scss";

interface IProps {
  onClick?: (args: any) => void;
  children: ReactNode;
}

const TableColumn: FC<IProps> = ({ onClick, children }) => {
  return (
    <div onClick={onClick} className={styles.tableColumn}>
      {children}
    </div>
  );
};

export default TableColumn;
