import React, { useEffect } from "react";

interface IProps {
  ref: React.RefObject<HTMLDivElement>;
  handler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const useOnClickOutside = ({ ref, handler }: IProps) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
