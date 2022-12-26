import { useRef } from "react";

const useFocus = () => {
  const htmlElRef = useRef<HTMLInputElement>(null);

  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus] as [
    React.RefObject<HTMLInputElement>,
    () => void
  ];
};

export default useFocus;
