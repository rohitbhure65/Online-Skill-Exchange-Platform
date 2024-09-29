import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Listing = () => {
  const [listings, setListings] = useState([]);
  const [skill, setSkills] = useState([]);
  const [user, setUser] = useState([]);

  const [filter, setFilter] = useState({
    search: "",
    city: "",
    skill: "",
    type: "",
    status: "",
    sort: "",
  });

  const handlersort = (e) => {
    const { value, name } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/listings`);
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }
        const data = await response.json();
        console.log("listing ", data.finalquery);
        setListings(data.finalquery); // Ensure it's an array
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log("users ", data.response);
        setUser(data.response); // Ensure it's an array
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  },[]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/skills");
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

  return (
    <div className="container flex flex-col md:flex-row flex-wrap max-w-8xl mx-auto p-4 bg-white shadow-md rounded-lg mt-10 mb-10">
      <div className="flex-2 ml-10 mr-10 mb-4 md:mb-0 md:mr-4">
        <h2 className="text-xl font-semibold mb-4">Search Filter</h2>

        <input
          type="text"
          placeholder="Search products..."
          className="border rounded p-2 w-full mb-4"
          name="search"
          value={filter.search}
          onChange={handlersort}
        />

        <div className="mb-4">
          <label className="block mb-1">City</label>
          <select
            className="border rounded p-2 w-full"
            name="city"
            value={filter.city}
            onChange={handlersort}
          >
            <option value="">Select City</option>
            {Array.isArray(user) &&
              user.map((users, index) => (
                <option key={index} value={users.location?.city}>
                  {users.location?.city}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Skill</label>
          <select
            className="border rounded p-2 w-full"
            name="skill"
            value={filter.skill}
            onChange={handlersort}
          >
            <option value="">Select Skill</option>
            {Array.isArray(skill) &&
              skill.map((skills, index) => (
                <option key={index} value={skills.name}>
                  {skills.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Type</label>
          <select
            className="border rounded p-2 w-full"
            name="type"
            value={filter.type}
            onChange={handlersort}
          >
            <option value="">Select Type</option>
            <option value="offer">Offer</option>
            <option value="request">Request</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Status</label>
          <select
            className="border rounded p-2 w-full"
            name="status"
            value={filter.status}
            onChange={handlersort}
          >
            <option value="">Select Status</option>
            <option value="active">Open</option>
            <option value="pending">Pending</option>
            <option value="close">Closed</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Sort By</label>
          <select
            className="border rounded p-2 w-full"
            name="sort"
            value={filter.sort}
            onChange={handlersort}
          >
            <option value="">Select Sort Option</option>
            <option value="date-asc">Rating Ascending</option>
            <option value="date-desc">Rating Descending</option>
          </select>
        </div>
      </div>

      <div className="flex-1 flex flex-wrap justify-center">
        {listings.length > 0 ? (
          listings.map((listing, index) => (
            <Card key={index} listing={listing} />
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
};

export default Listing;
