import React, { useEffect } from "react";
import Button from "../../components/Button";
import AuthService from "../../services/auth";
import axios from "axios";
function Home() {
  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:5000/");
    })();
  }, []);
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
