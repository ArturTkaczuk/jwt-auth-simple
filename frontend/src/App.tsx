import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Navbar />
        <Toaster position="bottom-left" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </UserContextProvider>
  );
}

export default App;
