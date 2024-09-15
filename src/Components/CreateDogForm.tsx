import React, { useState } from "react";
import { useDogContext } from "../Context/DogContext";
import toast from "react-hot-toast";
import { Dog } from "../types";

export const CreateDogForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { addDog, loading } = useDogContext();

  const resetForm = () => {
    setName("");
    setDescription("");
    setImage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDog: Omit<Dog, "id"> = {
      name,
      description,
      image,
      isFavorite: false,
    };

    await addDog(newDog)
      .then(() => {
        toast.success("Dog Created");
        resetForm();
      })
      .catch(() => {
        toast.error("Failed to create dog");
      });
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
        disabled={loading}
        required
      />

      <h4>Dog Description</h4>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        title="Dog Description"
        disabled={loading}
        placeholder=""
      />

      <h4>Select an Image</h4>
      <select
        value={image}
        onChange={(e) => setImage(e.target.value)}
        title="Select an Image"
        disabled={loading}
        required>
        <option value="blue-heeler.png">Blue Heeler</option>
        <option value="boxer.jpeg">Boxer</option>
        <option value="chihuahua.avif">Chihuahua</option>
        <option value="corgi.png">Corgi</option>
        <option value="cowardly.png">Cowardly</option>
        <option value="dalmation.png">Dalmation</option>
      </select>

      <button className="btn" type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );
};
