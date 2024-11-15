import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

const Listing = () => {
  const [listings, setListings] = useState([]);
  const [skills, setSkills] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    city: "",
    skill: "",
    rating: "",
    type: "",
    status: "",
    sort: "",
    order: "asc",
    page: 1,
    limit: 6,
  });

  // Handle changes in filter form
  const handleSort = (e) => {
    const { value, name } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setFilter((prev) => ({ ...prev, page: newPage }));
  };

  // Fetch listings with filtering
  const fetchListings = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filter).toString();
      const response = await axios.get(`/api/v1/listings?${query}`);
      setListings(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
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
        const response = await axios.get("/api/v1/users");
        setUsers(
          Array.isArray(response.data.response) ? response.data.response : []
        );
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
        const response = await axios.get("/api/v1/skills");
        setSkills(
          Array.isArray(response.data.response) ? response.data.response : []
        );
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div className="container flex flex-col md:flex-row flex-wrap max-w-8xl mx-auto p-4 bg-white shadow-md rounded-lg mt-10 mb-10">
      {/* Filter Section */}
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
            {users.map((user, index) => (
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
            {skills.map((skill, index) => (
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
            <option value="closed">Closed</option>
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

        <div className="mb-4">
          <label className="block mb-1">Order</label>
          <select
            className="border rounded p-2 w-full"
            name="order"
            value={filter.order}
            onChange={handleSort}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Listings Section */}
      <div className="flex-1 flex flex-wrap justify-center">
        {loading ? (
          <div className="text-center flex items-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : listings.length > 0 ? (
          listings.map((listing) => (
            <Card key={listing._id} listing={listing} />
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>

      {/* Pagination Section */}
      <div className="w-full flex justify-center md:justify-end mt-6">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(filter.page - 1)}
          disabled={filter.page <= 1}
          className="px-4 py-2 text-white bg-gradient-to-r from-gray-500 to-gray-700 rounded-md mr-4 shadow-md hover:from-gray-600 hover:to-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        {/* Page Number */}
        <span className="px-4 py-2 bg-white text-gray-700 font-medium rounded-md shadow-md">
          Page {filter.page}
        </span>

        {/* Next Button */}
        {listings.length > 0 && (
          <button
            onClick={() => handlePageChange(filter.page + 1)}
            className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-md ml-4 shadow-md hover:from-blue-600 hover:to-blue-800 transition"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default Listing;
