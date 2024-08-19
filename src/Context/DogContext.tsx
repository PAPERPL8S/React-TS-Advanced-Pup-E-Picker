import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllDogs, Dog } from "../api";

interface DogContextType {
  dogs: Dog[];
  setDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
  refreshDogs: () => void;
}

const DogContext = createContext<DogContextType | undefined>(undefined);

export const useDogs = () => {
  const context = useContext(DogContext);
  if (!context) {
    throw new Error("useDogs must be used within a DogProvider");
  }
  return context;
};

export const DogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dogs, setDogs] = useState<Dog[]>([]);

  const refreshDogs = async () => {
    try {
      const fetchedDogs = await getAllDogs();
      setDogs(fetchedDogs);
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
    }
  };

  useEffect(() => {
    refreshDogs();
  }, []);

  return (
    <DogContext.Provider value={{ dogs, setDogs, refreshDogs }}>
      {children}
    </DogContext.Provider>
  );
};
