import { createContext, useContext, useState, useEffect } from "react";
import { createDog, getAllDogs, patchFavoriteForDog, deleteDog } from "../api";

export type Dog = {
  id: number;
  name: string;
  description?: string;
  image?: string;
  isFavorite: boolean;
};

export type DogContextType = {
  dogs: Dog[];
  loading: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
  addDog: (dog: Dog) => void;
  toggleFavorite: (id: number) => void;
  removeDog: (id: number) => void;
};

const DogContext = createContext<DogContextType | undefined>(undefined);

export const DogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>("all");

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const fetchedDogs = await getAllDogs();
        setDogs(fetchedDogs.filter((dog) => dog.id !== undefined) as Dog[]);
      } catch (error) {
        console.error("Failed to fetch dogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  const addDog = async (newDog: Dog) => {
    try {
      const createdDog = await createDog(newDog);
      if (createdDog) {
        setDogs((prevDogs) => [...prevDogs, createdDog as Dog]);
      } else {
        console.error("Failed to create dog, received undefined");
      }
    } catch (error) {
      console.error("Failed to create dog:", error);
    }
  };

  const toggleFavorite = async (id: number) => {
    setDogs((prevDogs) =>
      prevDogs.map((dog) =>
        dog.id === id ? { ...dog, isFavorite: !dog.isFavorite } : dog,
      ),
    );

    try {
      const dogToUpdate = dogs.find((dog) => dog.id === id);
      if (dogToUpdate) {
        await patchFavoriteForDog(id, !dogToUpdate.isFavorite);
      }
    } catch (error) {
      console.error("Failed to update dog's favorite status:", error);
      setDogs((prevDogs) =>
        prevDogs.map((dog) =>
          dog.id === id ? { ...dog, isFavorite: !dog.isFavorite } : dog,
        ),
      );
    }
  };

  const removeDog = async (id: number) => {
    setDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== id));

    try {
      await deleteDog(id);
    } catch (error) {
      console.error("Failed to delete dog:", error);
    }
  };

  return (
    <DogContext.Provider
      value={{
        dogs,
        loading,
        activeSection,
        setActiveSection,
        addDog,
        toggleFavorite,
        removeDog,
      }}>
      {children}
    </DogContext.Provider>
  );
};

export const useDogContext = () => {
  const context = useContext(DogContext);
  if (!context) {
    throw new Error("useDogContext must be used within a DogProvider");
  }
  return context;
};
