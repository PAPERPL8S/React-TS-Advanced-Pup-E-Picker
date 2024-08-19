// import React, { createContext, useContext, useState, useEffect } from "react";
// import { Requests } from "../api";

// export type Dog = {
//   id: number;
//   name: string;
//   description: string;
//   picture: string;
//   isFavorite: boolean;
// };

// type DogContextType = {
//   dogs: Dog[];
//   setDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
// };

// const DogContext = createContext<DogContextType | undefined>(undefined);

// export const DogProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [dogs, setDogs] = useState<Dog[]>([]);

//   useEffect(() => {
//     const fetchDogs = async () => {
//       try {
//         const fetchedDogs = await Requests.getAllDogs();
//         setDogs(fetchedDogs);
//       } catch (error) {
//         console.error("Failed to fetch dogs:", error);
//       }
//     };

//     fetchDogs();
//   }, []);

//   return (
//     <DogContext.Provider value={{ dogs, setDogs }}>
//       {children}
//     </DogContext.Provider>
//   );
// };

// export const useDogs = () => {
//   const context = useContext(DogContext);
//   if (!context) {
//     throw new Error("useDogs must be used within a DogProvider");
//   }
//   return context;
// };

import React from "react";
import { Dog } from "../api";
import { useDogs } from "../Context/DogContext";
import { patchFavoriteForDog, deleteDog } from "../api";
import { toast } from "react-hot-toast";

export const Dogs: React.FC<{ dogs: Dog[] }> = ({ dogs }) => {
  return (
    <div className="dogs-list">
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
};

export const DogCard: React.FC<{ dog: Dog }> = ({ dog }) => {
  const { setDogs } = useDogs();

  const handleFavoriteToggle = async () => {
    try {
      const updatedDog = await patchFavoriteForDog(dog.id!, !dog.isFavorite);
      setDogs((prevDogs) =>
        prevDogs.map((d) => (d.id === dog.id ? updatedDog : d)),
      );
    } catch (error) {
      toast.error("Failed to update favorite status");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDog(dog.id!);
      setDogs((prevDogs) => prevDogs.filter((d) => d.id !== dog.id));
      toast.success("Dog deleted");
    } catch (error) {
      toast.error("Failed to delete dog");
    }
  };

  return (
    <div className="dog-card">
      <h3>{dog.name}</h3>
      <button onClick={handleFavoriteToggle}>
        {dog.isFavorite ? "❤️" : "🤍"}
      </button>
      <button onClick={handleDelete}>🗑️</button>
    </div>
  );
};