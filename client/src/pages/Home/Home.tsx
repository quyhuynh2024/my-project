import React from "react";
import Button from "../../components/Button";

function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <Button data-ripple="#0990ff" variant="outlined">
        button 2
      </Button>
      <Button data-ripple="#ffffff">button 3</Button>
    </div>
  );
}

export default Home;
