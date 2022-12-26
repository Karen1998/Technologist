import React, { ChangeEvent, FC, useEffect, useState } from "react";
import useFocus from "../../hooks/useFocus/useFocus.hook";
import styles from "./Input.module.scss";

interface IProps {
  value?: string;
  isFocused?: boolean;
  onBlur: (value: string) => void;
}

const Input: FC<IProps> = ({ value = "", onBlur, isFocused }) => {
  const [localValue, setLocalValue] = useState(value);
  const [inputRef, setFocus] = useFocus();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleOnBlur = () => {
    setLocalValue("");
    onBlur(localValue);
  };

  const func = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleOnBlur();
    }
  };

  useEffect(() => {
    const el = inputRef.current;

    el?.addEventListener("keypress", func);

    return () => {
      el?.removeEventListener("keypress", func);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValue]);

  useEffect(() => {
    if (isFocused) {
      setFocus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <input
      ref={inputRef}
      value={localValue}
      onChange={handleChange}
      onBlur={handleOnBlur}
      className={styles.root}
    />
  );
};

export default Input;
