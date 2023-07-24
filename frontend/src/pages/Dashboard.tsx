import { useContext } from "react";
import { UserContext } from "../context/userContext";

type userType = {
  id: string;
  email: string;
  name: string;
} | null;

type UserContextType = {
  user: userType;
  fetchUser: () => Promise<void>;
};

export const Dashboard = (): JSX.Element => {
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? <h2>Hi {user.name}!</h2> : <h2>Hi Guest!</h2>}
    </div>
  );
};
