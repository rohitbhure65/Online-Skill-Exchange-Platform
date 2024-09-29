import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Listing = () => {
  const [listings, setListings] = useState([]);
  const [skills, setSkills] = useState([]);
  const [users, setUsers] = useState([]);

  const [filter, setFilter] = useState({
    city: "",
    skill: "",
    rating: "",
    type: "",
    status: "",
    sort: "",
    order: "",
    page: "",
    limit: "",
  });

  // Handle changes in filter form
  const handleSort = (e) => {
    const { value, name } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch listings with filtering
  const fetchListings = async () => {
    try {
      // Create URL query by filtering out empty values
      const response = await fetch(`http://localhost:5000/api/v1/listings`);

      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data = await response.json();
      console.log("Listings: ", data);
      setListings(Array.isArray(data) ? data : []); // Ensure it's an array
    } catch (err) {
      console.error("Error fetching listings:", err);
    }
  };

  // Fetch listings whenever filter changes
  useEffect(() => {
    fetchListings();
  }, [filter]);

  // Fetch users (for city filtering)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log("Users: ", data.response);
        setUsers(Array.isArray(data.response) ? data.response : []); // Ensure it's an array
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Fetch skills (for skill filtering)
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/skills");
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }
        const data = await response.json();
        console.log("Skills: ", data.response);
        setSkills(Array.isArray(data.response) ? data.response : []); // Ensure it's an array
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
        <div className="mb-4">
          <label className="block mb-1">City</label>
          <select
            className="border rounded p-2 w-full"
            name="city"
            value={filter.city}
            onChange={handleSort}
          >
            <option value="">Select City</option>
            {Array.isArray(users) &&
              users.map((user, index) => (
                <option key={index} value={user.location?.city}>
                  {user.location?.city}
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
            onChange={handleSort}
          >
            <option value="">Select Skill</option>
            {Array.isArray(skills) &&
              skills.map((skill, index) => (
                <option key={index} value={skill.name}>
                  {skill.name}
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
            onChange={handleSort}
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
            onChange={handleSort}
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
            onChange={handleSort}
          >
            <option value="">Select Sort Option</option>
            <option value="date">Date</option>
            <option value="rating">Rating</option>
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
