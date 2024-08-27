import React, { useState } from "react";
import { useDogContext } from "../Context/DogContext";
import toast from "react-hot-toast";

export const CreateDogForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const { addDog } = useDogContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDog = {
      id: Date.now(),
      name,
      description,
      picture,
      isFavorite: false,
    };

    await addDog(newDog);
    toast.success("Dog Created");
    setName("");
    setDescription("");
    setPicture("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Dog Name"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Dog Description"
      />
      <input
        type="text"
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
        placeholder="Picture URL"
      />
      <button type="submit">Create Dog</button>
    </form>
  );
};
