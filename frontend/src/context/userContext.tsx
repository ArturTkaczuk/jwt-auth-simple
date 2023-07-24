import axios from "../axios";
import { createContext, useState, useEffect } from "react";

type userType = {
  id: string;
  email: string;
  name: string;
} | null;

type UserContextType = {
  user: userType;
  fetchUser: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({ children }: any) {
  const [user, setUser] = useState<userType | null>(null);
  const fetchUser = async () => {
    const fetchedUser = (await axios.get("/profile")).data as userType;
    setUser(fetchedUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}
