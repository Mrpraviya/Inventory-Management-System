import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Root from "./utils/Root";
import Login from "./pages/Login";
import ProtecedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/admin/dashboard" element={<h1>Admin dashboard</h1>} />
        <Route path="/customer/dashboard" element={<ProtecedRoutes requireRole= {["admin"]}>
          <h1>Customer dashboard</h1>
        </ProtecedRoutes> }/>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element= {<p className='font-bold text-3xl mt-20 ml-20'>Unauthorized </p>}  ></Route>

      </Routes>
    </Router>
  );
}

export default App;
