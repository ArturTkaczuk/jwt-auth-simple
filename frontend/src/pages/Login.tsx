import toast from "react-hot-toast";
import axios from "../axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginData;
    try {
      const { data } = await axios.post("/login", { email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setLoginData({
          email: "",
          password: "",
        });
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
