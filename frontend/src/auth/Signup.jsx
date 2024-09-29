import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    profile_pic: "",
    gender: "",
    bio: "",
    location: {
      city: "",
      state: "",
      country: "",
    },
    skills_offered: "",
    skills_needed: "",
  });

  const navigate = useNavigate()
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle input changes for general fields
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Handle input changes for the location field
  const handleLocationChange = (e) => {
    const { name, value } = e.target;

    setUser((user) => ({
      ...user,
      location: {
        ...user.location,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("https://online-skill-exchange-platform.onrender.com/api/v1/skills");
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }
        const data = await response.json();
        console.log(data.response);
        setSkills(data.response); // Assuming data is an array of skills
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkills();
  }, []);

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      // Post data to the backend
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(response.data);
      setSuccessMessage("Signup successful!");

      // Optionally reset the form after success
      setUser({
        name: "",
        phone: "",
        email: "",
        password: "",
        profile_pic: "",
        gender: "",
        bio: "",
        location: { city: "", state: "", country: "" },
        skills_offered: "",
        skills_needed: "",
      });

      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container max-w-xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Signup Form</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <input
            className="border rounded-lg p-2"
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            required
          />
          <input
            className="border rounded-lg p-2"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={user.phone}
            onChange={handleChange}
            required
          />
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
          <input
            className="border rounded-lg p-2"
            type="url"
            name="profile_pic"
            placeholder="Profile Picture URL"
            value={user.profile_pic}
            onChange={handleChange}
            required
          />
          <select
            className="border rounded-lg p-2"
            name="gender"
            value={user.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            className="border rounded-lg p-2"
            name="bio"
            placeholder="Bio"
            value={user.bio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Location</h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              className="border rounded-lg p-2"
              type="text"
              name="city"
              placeholder="City"
              value={user.location?.city || ""}
              onChange={handleLocationChange}
              required
            />
            <input
              className="border rounded-lg p-2"
              type="text"
              name="state"
              placeholder="State"
              value={user.location?.state || ""}
              onChange={handleLocationChange}
              required
            />
            <input
              className="border rounded-lg p-2"
              type="text"
              name="country"
              placeholder="Country"
              value={user.location?.country || ""}
              onChange={handleLocationChange}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Skills</h3>

          <select
            className="border rounded-lg p-2"
            name="skills_offered"
            value={user.skills_offered}
            onChange={handleChange}
            required
          >
            <option value="">Select Skills Offered</option>
            {Array.isArray(skills) &&
              skills.map((skill, index) => (
                <option key={index} value={skill._id}>
                  {skill.name}
                </option>
              ))}
          </select>

          {/* Dropdown for Skills Needed */}
          <select
            className="border rounded-lg ml-2 p-2 mt-2"
            name="skills_needed"
            value={user.skills_needed}
            onChange={handleChange}
            required
          >
            <option value="">Select Skills Offered</option>
            {skills.map((skill, index) => (
              <option key={index} value={skill._id}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg p-2 mt-4 w-full"
        >
          Sign Up
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mt-4">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
