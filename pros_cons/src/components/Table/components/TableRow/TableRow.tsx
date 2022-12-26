import React, { forwardRef } from "react";
import styles from "../../Table.module.scss";

interface IProps {
  children: React.ReactNode;
}

const TableRow = forwardRef<HTMLDivElement, IProps>(({ children }, ref) => {
  return (
    <div ref={ref} className={styles.tableRow}>
      {children}
    </div>
  );
});

export default TableRow;
