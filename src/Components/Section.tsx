import React, { useState } from "react";
import { useDogContext } from "../Context/DogContext";
import { Dogs } from "./Dogs";
import { CreateDogForm } from "./CreateDogForm";

export const Section: React.FC<{ label: string }> = ({ label }) => {
  const [activeTab, setActiveTab] = useState<
    "all" | "favorite" | "non-favorite" | "create"
  >("all");
  const { dogs } = useDogContext();

  const favoritesDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoritesDogs = dogs.filter((dog) => !dog.isFavorite);

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <div
            className={`selector ${
              activeTab === "non-favorite" ? "active" : ""
            }`}
            onClick={() => setActiveTab("non-favorite")}>
            Non-Favorites ({unfavoritesDogs.length})
          </div>
          <div
            className={`selector ${activeTab === "favorite" ? "active" : ""}`}
            onClick={() => setActiveTab("favorite")}>
            Favorites ({favoritesDogs.length})
          </div>
          <div
            className={`selector ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}>
            All Dogs ({dogs.length})
          </div>
          <div
            className={`selector ${activeTab === "create" ? "active" : ""}`}
            onClick={() => setActiveTab("create")}>
            Create Dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {activeTab === "all" && <Dogs dogs={dogs as { image: string; name: string; description: string; id: number; isFavorite: boolean; }[]} />}
        {activeTab === "favorite" && <Dogs dogs={favoritesDogs as { image: string; id: number; name: string; description: string; isFavorite: boolean; }[]} />}
        {activeTab === "non-favorite" && <Dogs dogs={unfavoritesDogs as { image: string; id: number; name: string; description: string; isFavorite: boolean; }[]} />}
        {activeTab === "create" && <CreateDogForm />}
      </div>
    </section>
  );
};
