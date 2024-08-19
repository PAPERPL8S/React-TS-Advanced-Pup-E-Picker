import { Section } from "./Section";
import { CreateDogForm } from "./CreateDogForm";
import { useState } from "react";
import { Dogs } from "./Dogs";


export function App() {
  const [activeSection, setActiveSection] = useState("all");

  return (
    <div className="App">
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <nav>
        <button onClick={() => setActiveSection("all")}>View All Dogs</button>
        <button onClick={() => setActiveSection("create")}>Create a Dog</button>
      </nav>
      <Section>
        {activeSection === "all" && <Dogs dogs={[]} />}
        {activeSection === "create" && <CreateDogForm />}
      </Section>
    </div>
  );
}
