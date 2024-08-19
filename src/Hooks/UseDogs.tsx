import { useDogs } from "../Context/DogContext";

export const Dogs = () => {
  const { dogs } = useDogs();

  return (
    <div>
      {dogs.map((dog) => (
        <div key={dog.id}>{dog.name}</div>
      ))}
    </div>
  );
};
