import Section from "./Components/Section";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { useDogContext } from "./Context/DogContext";

export function App() {
  const { activeSection, loading } = useDogContext();
  if (loading) return <p>Loading...</p>;
  return (
    <div className="App">
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section>
        {activeSection !== "create" && <Dogs />}
        {activeSection === "create" && <CreateDogForm />}
      </Section>
    </div>
  );
}
