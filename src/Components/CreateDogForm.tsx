import React, { useState } from "react";
import { useDogContext } from "../Context/DogContext";
import toast from "react-hot-toast";

export const CreateDogForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [Image, setImage] = useState("");
  const { addDog } = useDogContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDog = {
      id: Date.now(),
      name,
      description,
      Image,
      isFavorite: false,
    };

    await addDog(newDog);
    toast.success("Dog Created");
    setName("");
    setDescription("");
    setImage("");
  };

  return (
    <form id="create-dog-form" onSubmit={handleSubmit}>
      <h2>Create a New Dog</h2>

      <h4>Dog Name</h4>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        title="Dog Name"
        required
      />

      <h4>Dog Description</h4>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        title="Dog Description"
        placeholder=""
      />

      <h4>Select an Image</h4>
      <select
        value={Image}
        onChange={(e) => setImage(e.target.value)}
        title="Select an Image"
        required>
        <option value="blue-heeler.png">Blue Heeler</option>
        <option value="boxer.jpeg">Boxer</option>
        <option value="chihuahua.avif">Chihuahua</option>
        <option value="corgi.png">Corgi</option>
        <option value="cowardly.png">Cowardly</option>
        <option value="dalmation.png">Dalmation</option>
      </select>

      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
};
