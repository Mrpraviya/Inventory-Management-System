import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router";
// import Root from "./utils/Root";
import Login from "./pages/Login";
import ProtecedRoutes from "./utils/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Categories from "./components/Categories";
import Supplier from "./components/Supplier";
import Products from "./components/Products";
import Logout from "./components/Logout";
import Users from "./components/Users";
import CustomerProducts from "./components/CustomerProducts";
import Orders from "./components/Orders";
import Profile from "./components/Profile";
import Summary from "./components/Summary";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtecedRoutes requireRole={["admin"]}>
                <Dashboard />
              </ProtecedRoutes>
            }
          >
            <Route index element={
              < Summary />
            } />

            <Route path="categories" element={<Categories />} />

            <Route path="products" element={<Products />} />

            <Route path="suppliers" element={<Supplier />} />

            <Route path="orders" element={<Orders />} />

            <Route path="users" element={<Users />} />

            <Route path="profile" element={<Profile />} />

            <Route path="logout" element={<Logout />} />
          </Route>
          <Route path="/customer-dashboard" element={<Dashboard />}>
            <Route index element={<CustomerProducts />}></Route>
            <Route path="orders" element={<Orders />}></Route>
            <Route path="logout" element={<Logout />}></Route>
            <Route path="profile" element={<Profile />}></Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route
            path="/unauthorized"
            element={
              <p className="font-bold text-3xl mt-20 ml-20">Unauthorized </p>
            }
          ></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
