import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Signup from "./pages/Signup";
import Login from "./pages/Login"; 
import Homepage from "./pages/Homepage";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from './components/ui/Navbar'; // 👈 Import the Navbar component
import {store} from './store/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar /> {/* 👈 Add the Navbar here */}
        <Routes>
          <Route path="/" element={<Homepage />} /> {/* Default route */}
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/signup" element={<Signup />} /> {/* 👈 Corrected path */}
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Homepage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
