import { useDogContext } from "../Context/DogContext";
import { dogPictures } from "../dog-pictures";

export const Dogs = () => {
  const { toggleFavorite, dogs, removeDog, loading } = useDogContext();

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
            <h3 className="dog-name">{dog.name}</h3>
            <img src={dog.image || dogPictures.BlueHeeler} alt={dog.name} />
          </div>
          <p className="dog-description">{dog.description}</p>
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
