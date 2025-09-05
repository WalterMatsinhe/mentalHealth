import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBarLogged from "../../components/NavBarLogged";
import ThemeToggle from "../../components/ThemeToggle";
import FooterLogged from "../../components/FooterLogged";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setSuccess("Registration successful! Redirecting to login...");
      setForm({ name: "", email: "", password: "", role: "user" });
      setTimeout(() => {
        navigate("/auth/login");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <NavBarLogged />
      <ThemeToggle />
      <div className="flex flex-col items-center justify-center min-h-screen pt-20">
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow-md w-full max-w-md shadow-primary"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            {error && <div className="text-red-500 mb-2">{error}</div>}

            {success && <div className="text-green-500 mb-2">{success}</div>}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded hover:scale-105 transition"
            >
              Register
            </button>
          </form>
        </div>
         <div className="w-full mt-2">
          <FooterLogged/>
        </div>
      </div>
    
    </>
  );
};

export default Register;
