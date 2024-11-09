import { forwardRef, useImperativeHandle, useRef } from "react";

const Imperative = forwardRef(function Imperative(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          inputRef.current.focus;
        },
      };
    },
    []
  );
  return <input {...props} ref={ref} />;
});

export default Imperative;
