import React, { useState, ReactNode } from "react";
import { useDogContext } from "../Context/DogContext";
import { Dogs } from "./Dogs";
import { CreateDogForm } from "./CreateDogForm";

interface Section {
  label?: string;
  children?: ReactNode;
}

export const Section: React.FC<Section> = ({ label }) => {
  const [activeTab, setActiveTab] = useState<
    "favorite" | "non-favorite" | "create" | null
  >(null);
  const { dogs } = useDogContext();

  const favoritesDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoritesDogs = dogs.filter((dog) => !dog.isFavorite);

  const handleTabClick = (tab: "favorite" | "non-favorite" | "create") => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <div
            className={`selector ${activeTab === "favorite" ? "active" : ""}`}
            onClick={() => handleTabClick("favorite")}
            role="tab"
            aria-selected={activeTab === "favorite"}>
            Favorites ({favoritesDogs.length})
          </div>
          <div
            className={`selector ${
              activeTab === "non-favorite" ? "active" : ""
            }`}
            onClick={() => handleTabClick("non-favorite")}
            role="tab"
            aria-selected={activeTab === "non-favorite"}>
            Non-Favorites ({unfavoritesDogs.length})
          </div>

          <div
            className={`selector ${activeTab === "create" ? "active" : ""}`}
            onClick={() => handleTabClick("create")}
            role="tab"
            aria-selected={activeTab === "create"}>
            Create Dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {activeTab === null && (
          <Dogs
            dogs={
              dogs as {
                name: string;
                description: string;
                image: string;
                id: number;
                isFavorite: boolean;
              }[]
            }
          />
        )}
        {activeTab === "favorite" && (
          <Dogs
            dogs={
              favoritesDogs as {
                name: string;
                description: string;
                image: string;
                id: number;
                isFavorite: boolean;
              }[]
            }
          />
        )}
        {activeTab === "non-favorite" && (
          <Dogs
            dogs={
              unfavoritesDogs as {
                name: string;
                description: string;
                image: string;
                id: number;
                isFavorite: boolean;
              }[]
            }
          />
        )}
        {activeTab === "create" && <CreateDogForm />}
      </div>
    </section>
  );
};

export default Section;
