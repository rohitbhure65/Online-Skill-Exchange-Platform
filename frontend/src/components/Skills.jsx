import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SkillCategories = () => {
  const [skills, setSkills] = useState([]);
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
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Skill Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
              <p className="text-gray-600">{skill.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link to="page/listings">
            <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 transition duration-300">
              View Listings
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SkillCategories;
