import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import CreateProject from "./pages/CreateProject";

import UserProject from "./pages/UserProject";


import UpdateProject from "./pages/UpdateProject";
import SearchProject from "./pages/SearchProject";
import UserPage from "./pages/UserPage";
import GitHub from "./pages/GitHub";
import OtherUsers from "./pages/OtherUsers";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-project" element={<CreateProject />} />

        <Route path="/project/:projectId" element={<UpdateProject />} />
        {/* <Route path="/projects" element={<Projects />} /> */}

        <Route path="/search-projects" element={<SearchProject />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/my-projects/:id" element={<UserProject />} />
        <Route path="/github/:id" element={<GitHub />} />
        <Route path="/otherUsers/:id" element={<OtherUsers />} />
      </Routes>
    </>
  );
}

export default App;
