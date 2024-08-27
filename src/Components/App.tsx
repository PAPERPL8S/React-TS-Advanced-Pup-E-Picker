import React from "react";
import { Section } from "./Section";
import { CreateDogForm } from "./CreateDogForm";
import { Dogs } from "./Dogs";
import { Dog, DogProvider, useDogContext } from "../Context/DogContext";

export function App() {
  return (
    <DogProvider>
      <div className="App">
        <header>
          <h1>pup-e-picker (Functional)</h1>
        </header>
        <MainContent />
      </div>
    </DogProvider>
  );
}

export type DogContextType = {
  activeSection: string;

  setActiveSection: (section: string) => void;

  dogs: Dog[];

  loading: boolean;
};

const MainContent: React.FC = () => {
  const { activeSection, dogs, loading } = useDogContext();

  if (loading) return <p>Loading...</p>;

  return (
    <Section>
      {activeSection !== "create" && (
        <Dogs
          dogs={dogs.filter((dog) => {
            if (activeSection === "favorite") return dog.isFavorite;
            if (activeSection === "unfavorite") return !dog.isFavorite;
            return true;
          })}
        />
      )}
      {activeSection === "create" && <CreateDogForm />}
    </Section>
  );
};
