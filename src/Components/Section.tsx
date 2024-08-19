import React, { useState } from "react";
import { useDogs } from "../Context/DogContext";
import { Dogs } from "./Dogs";
import { CreateDogForm } from "./CreateDogForm";

export const Section: React.FC<{ label: string }> = ({ label }) => {
  const [activeTab, setActiveTab] = useState<"all" | "favorite" | "create">(
    "all",
  );
  const { dogs } = useDogs();

  const favoritesDogs = dogs.filter((dog) => dog.isFavorite);

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <div
            className={`selector ${activeTab === "favorite" ? "active" : ""}`}
            onClick={() => setActiveTab("favorite")}>
            favorited ({favoritesDogs.length})
          </div>
          <div
            className={`selector ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}>
            all ({dogs.length})
          </div>
          <div
            className={`selector ${activeTab === "create" ? "active" : ""}`}
            onClick={() => setActiveTab("create")}>
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {activeTab === "all" && <Dogs dogs={dogs} />}
        {activeTab === "favorite" && <Dogs dogs={favoritesDogs} />}
        {activeTab === "create" && <CreateDogForm />}
      </div>
    </section>
  );
};
