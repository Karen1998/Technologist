import React, { useRef } from "react";
import { useState } from "react";
import Input from "./components/Input/Input";
import TableColumn from "./components/Table/components/TableColumn/TableColumn";
import TableData from "./components/Table/components/TableData/TableData";
import TableRow from "./components/Table/components/TableRow/TableRow";
import Table from "./components/Table/Table";
import "./reset.css";
import "./App.css";
import useOnClickOutside from "./hooks/useOnClickOutside/useOnClickOutside.hook";

type DataList = {
  value: string;
  edit: boolean;
  id: number;
};

type FocusedColumn = {
  pros: boolean;
  cons: boolean;
};

function App() {
  const [prosList, setProsList] = useState<DataList[]>([]);
  const [consList, setConsList] = useState<DataList[]>([]);
  const [focusedColumn, setFocusedColumn] = useState<FocusedColumn>({
    pros: false,
    cons: false,
  });

  const listRef = useRef(new Set());
  const tableRef = useRef<HTMLDivElement>(null);

  useOnClickOutside({
    ref: tableRef,
    handler: () => {
      setFocusedColumn({
        pros: false,
        cons: false,
      });
    },
  });

  const validate = (value: string) => {
    return !listRef.current.has(value) && value.length > 0;
  };

  const handleAddPros = (value: string) => {
    const canAdd = validate(value);

    if (canAdd) {
      setProsList((prevState) => [
        ...prevState,
        {
          value,
          edit: false,
          id: prevState.length + 1,
        },
      ]);
      listRef.current.add(value);
    }
  };

  const handleAddCons = (value: string) => {
    const canAdd = validate(value);

    if (canAdd) {
      setConsList((prevState) => [
        ...prevState,
        {
          value,
          edit: false,
          id: prevState.length + 1,
        },
      ]);
      listRef.current.add(value);
    }
  };

  const handleChangePros = (id: number) => (value: string) => {
    const canEdit = validate(value);

    if (canEdit) {
      setProsList((prevState) =>
        prevState.map((prosListItem) =>
          prosListItem.id === id
            ? { ...prosListItem, value, edit: false }
            : prosListItem
        )
      );
      listRef.current.add(value);
    }
  };

  const handleEditPros = (id: number) => () => {
    setProsList((prevState) =>
      prevState.map((prosListItem) =>
        prosListItem.id === id
          ? { ...prosListItem, edit: true }
          : { ...prosListItem, edit: false }
      )
    );
  };

  const handleFocus = (column?: "pros" | "cons") => () => {
    if (column === "cons") {
      return setFocusedColumn({ pros: false, cons: true });
    }

    return setFocusedColumn({ pros: true, cons: false });
  };

  return (
    <Table>
      <TableRow>
        <TableData>Prop</TableData>
        <TableData>Cons</TableData>
      </TableRow>

      <TableRow ref={tableRef}>
        <TableColumn onClick={handleFocus("pros")}>
          {prosList.map((prosListItem) => (
            <TableData key={`prop_${prosListItem.id}`}>
              {prosListItem.edit ? (
                <Input
                  value={prosListItem.value}
                  onBlur={handleChangePros(prosListItem.id)}
                />
              ) : (
                <span onClick={handleEditPros(prosListItem.id)}>
                  {prosListItem.value}
                </span>
              )}
            </TableData>
          ))}

          <TableData>
            <Input onBlur={handleAddPros} isFocused={focusedColumn.pros} />
          </TableData>
        </TableColumn>

        <TableColumn onClick={handleFocus("cons")}>
          {consList.map((consListItem) => (
            <TableData key={`cons_${consListItem.id}`}>
              {consListItem.edit ? (
                <Input value={consListItem.value} onBlur={handleAddCons} />
              ) : (
                <span>{consListItem.value}</span>
              )}
            </TableData>
          ))}

          <TableData>
            <Input onBlur={handleAddCons} isFocused={focusedColumn.cons} />
          </TableData>
        </TableColumn>
      </TableRow>
    </Table>
  );
}

export default App;
