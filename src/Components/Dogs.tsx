import React from "react";
import { useDogContext } from "../Context/DogContext";


export const Dogs: React.FC = () => {
  const { dogs, toggleFavorite, removeDog, loading } = useDogContext();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (dogs.length === 0) {
    return <p>No dogs available</p>;
  }

  return (
    <div className="dogs-list">
      {dogs.map((dog) => (
        <div key={dog.id} className="dog-card">
          <div className="dog-info">
            <img src={dog.image || "/default-dog.png"} alt={dog.name} />
            <h3>{dog.name}</h3>
          </div>
          <div className="dog-actions">
            <button onClick={() => toggleFavorite(dog.id)}>
              {dog.isFavorite ? "❤️" : "🤍"}
            </button>
            <button onClick={() => removeDog(dog.id)}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
};

