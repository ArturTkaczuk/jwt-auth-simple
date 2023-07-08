import { useState } from "react";
import axios from "../axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = registerData;
    try {
      const { data } = await axios.post("/register", { name, email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setRegisterData({
          name: "",
          email: "",
          password: "",
        });
        toast.success("Registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter name"
          value={registerData.name}
          onChange={(e) =>
            setRegisterData({ ...registerData, name: e.target.value })
          }
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={registerData.email}
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={registerData.password}
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
