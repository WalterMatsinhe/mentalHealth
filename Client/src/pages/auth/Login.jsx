import React, { useState } from "react";
import axios from "axios";
import NavBarLogged from "../../components/NavBarLogged";
import ThemeToggle from "../../components/ThemeToggle";
import FooterLogged from "../../components/FooterLogged";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href =
  res.data.user.role === "admin" ? "/admin" : "/userView/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <NavBarLogged />
      <ThemeToggle />
      <div className="flex flex-col min-h-screen pt-20" style={{height: '100vh'}}>
        <div className="flex flex-1 flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow-xl shadow-primary w-full max-w-md"
            style={{ marginTop: 0, marginBottom: 0 }}
          >
            <div className="text-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">
                Sign in to your account
              </h1>
              <p className="mt-1 mb-2 text-sm">
                Don't have an account?
                <Link
                  className="font-medium text-primary ml-2 underline"
                  to="/auth/register"
                >
                  Register
                </Link>
              </p>
            </div>
            {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded text-sm"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded text-sm"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded hover:scale-105 text-sm"
            >
              Login
            </button>
          </form>
        </div>
        <div className="w-full mt-2">
          <FooterLogged/>
        </div>
	  </div>
	</>
  );
}

export default Login;
