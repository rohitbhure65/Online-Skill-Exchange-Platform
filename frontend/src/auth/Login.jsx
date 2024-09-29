import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);


  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      // Post data to the backend
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      setSuccessMessage("Login successful!");
      navigate("/");

      console.log("Login data:", data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 pt-40 pb-40 bg-white shadow-md mb-40 rounded-lg mt-10 container">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <input
            className="border rounded-lg p-2"
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            className="border rounded-lg p-2"
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg p-2 mt-4 w-full"
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mt-4">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
