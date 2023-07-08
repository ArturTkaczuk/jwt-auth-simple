import axios from "../axios";
import { useState } from "react";

export const Login = (): JSX.Element => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let res = await axios.get("/");
      console.log(res);
    } catch (err) {
      console.error(err);
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
