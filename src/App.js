import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from './SignUp'; // Adjust path according to your project structure
import Login from './Login';
import Dashboard from './Dashboard';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/create" element={<CreateProduct />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
