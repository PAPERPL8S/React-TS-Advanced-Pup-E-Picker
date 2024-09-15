import { ReactNode } from "react";
import { useDogContext } from "../Context/DogContext";

interface Section {
  label?: string;
  children?: ReactNode;
}

export const Section = ({ children }: { children: ReactNode }) => {
  const { favDogsCounter, nonFavDogsCounter, activeSection, handleTabClick } =
    useDogContext();

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label"></div>
        <div className="selectors">
          <div
            className={`selector ${
              activeSection === "favorite" ? "active" : ""
            }`}
            onClick={() => handleTabClick("favorite")}
            role="tab"
            aria-selected={activeSection === "favorite"}>
            Favorites ({favDogsCounter})
          </div>
          <div
            className={`selector ${
              activeSection === "non-favorite" ? "active" : ""
            }`}
            onClick={() => handleTabClick("non-favorite")}
            role="tab"
            aria-selected={activeSection === "non-favorite"}>
            Non-Favorites ({nonFavDogsCounter})
          </div>

          <div
            className={`selector ${activeSection === "create" ? "active" : ""}`}
            onClick={() => handleTabClick("create")}
            role="tab"
            aria-selected={activeSection === "create"}>
            Create Dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};

export default Section;
