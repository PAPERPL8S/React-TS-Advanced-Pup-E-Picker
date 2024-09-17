import { createContext, useContext, useState, useEffect } from "react";
import { createDog, getAllDogs, patchFavoriteForDog, deleteDog } from "../api";
import { Dog } from "../types";

type TActiveSectionTab = "favorite" | "non-favorite" | "all" | "create";

export type DogContextType = {
  dogs: Dog[];
  loading: boolean;
  activeSection: string;
  favDogsCounter: number;
  nonFavDogsCounter: number;
  setActiveSection: (section: string) => void;
  addDog: (dog: Omit<Dog, "id">) => Promise<void>;
  toggleFavorite: (id: number) => void;
  removeDog: (id: number) => void;
  handleTabClick: (tab: TActiveSectionTab) => void;
};

const DogContext = createContext<DogContextType | undefined>(undefined);

export const DogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("all");

  const fetchDogs = async () => {
    try {
      const fetchedDogs = await getAllDogs();
      setDogs(fetchedDogs);
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const favoritesDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoritesDogs = dogs.filter((dog) => !dog.isFavorite);

  const handleTabClick = (tab: TActiveSectionTab) => {
    setActiveSection(activeSection === tab ? "all" : tab);
  };

  const addDog = async (newDog: Omit<Dog, "id">) => {
    setLoading(true);
    try {
      const createdDog = await createDog(newDog);
      if (createdDog) {
        await fetchDogs();
      } else {
        console.error("Failed to create dog, received undefined");
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to create dog:", error);
      throw Error("Failed to create dog");
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
      setDogs(dogs);
    }
  };

  const removeDog = async (id: number) => {
    setDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== id));

    try {
      await deleteDog(id);
    } catch (error) {
      console.error("Failed to delete dog:", error);
      setDogs(dogs);
    }
  };

  const dogList: Record<TActiveSectionTab, Dog[]> = {
    all: dogs,
    favorite: favoritesDogs,
    "non-favorite": unfavoritesDogs,
    create: [],
  };

  return (
    <DogContext.Provider
      value={{
        dogs: dogList[activeSection as keyof typeof dogList],
        loading,
        activeSection,
        favDogsCounter: favoritesDogs.length,
        nonFavDogsCounter: unfavoritesDogs.length,
        setActiveSection,
        addDog,
        toggleFavorite,
        removeDog,
        handleTabClick,
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
