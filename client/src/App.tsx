import React, { useEffect, useRef } from "react";
import Button from "./components/Button";

function App() {
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);
  const btn3Ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log(btn1Ref.current);
    console.log(btn2Ref.current);
    console.log(btn3Ref.current);
  });

  return (
    <div>
      <Button ref={btn1Ref} disabled>
        button 1
      </Button>
      <Button ref={btn2Ref} data-ripple="#0990ff" variant="outlined">
        button 2
      </Button>
      <Button ref={btn3Ref} data-ripple="#ffffff">
        button 3
      </Button>
    </div>
  );
}

export default App;
