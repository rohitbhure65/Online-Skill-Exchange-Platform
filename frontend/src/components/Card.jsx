import React from "react";

const Card = ({ listing }) => {
  // Destructure listing correctly
  const {
    user_id: {
      name: username,
      profile_pic,
      rating: { average_rating, total_rating },
      location: { city, state, country },
      bio,
      phone
    },
    details,
    type,
    status,
  } = listing;

  return (
    <div className="max-w-sm mx-auto my-4 bg-white rounded-lg shadow-md overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={profile_pic}
        alt={`${username}'s profile`}
      />
      <div className="p-5">
        <h2 className="text-xl font-bold">{username}</h2>
        <p className="text-gray-600">{bio}</p>
        <p className="text-gray-500">
          Location: {city}, {state}, {country}
        </p>
        <div className="mt-2 flex justify-between">
          <span className="text-yellow-500 font-semibold">
            ⭐ {average_rating} ({total_rating} ratings)
          </span>
          <span className="font-semibold">📞 {phone}</span>
        </div>
        <h3 className="mt-4 text-lg font-semibold">Details</h3>
        <p className="text-gray-700">{details}</p>
 
        <div className="flex justify-between">
          <p
            className={`mt-2 font-semibold ${
              status === "open" ? "text-green-600" : "text-red-600"
            }`}
          >
            Status: {status}
          </p>
          <p
            className={`mt-2 font-semibold ${
              status === "open" ? "text-blue-600" : "text-orange-600"
            }`}
          >
            Type: {type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
