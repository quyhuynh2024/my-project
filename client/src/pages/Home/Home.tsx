import React, { useRef, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { LoginFormData } from "../../types";
import AuthService from "../../services/auth";
import api from "../../apis/configs/axiosConfig";
import axios from "axios";

function Home() {
  const formRef = useRef<HTMLFormElement>(null);

  /* const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  }); */

  /*  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }; */

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();
    try {
      await AuthService.login({
        email: formRef.current.email.value,
        password: formRef.current.password.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Input placeholder="Email" name="email" />
        <br />
        <Input placeholder="Password" name="password" />
        <br />
        <Button type="submit" data-ripple="#0990ff" variant="outlined">
          Log in
        </Button>
      </form>
      <Button
        data-ripple="#ffffff"
        onClick={async () => {
          try {
            const res = await api.get("http://localhost:5000");
            console.log(res);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Get /
      </Button>
    </div>
  );
}

export default Home;
