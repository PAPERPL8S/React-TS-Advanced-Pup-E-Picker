import React, { useState } from "react";
import { useDogContext } from "../Context/DogContext";
import toast from "react-hot-toast";
import { Dog } from "../types";


export const CreateDogForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const dogPictures = {
    "Blue Heeler": "/assets/blue-heeler.png",
    "Boxer": "/assets/boxer.jpeg",
    "Chihuahua": "/assets/chihuahua.avif",
    "Corgi": "/assets/corgi.png",
    "Cowardly": "/assets/cowardly.png",
    "Dalmation": "/assets/dalmation.png",
  };

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
        required
      > 
        {Object.entries(dogPictures).map((item) => {
          return (
            <option key={item[0]} value={item[1]}>
              {item[0]}
            </option>
          );
        })}
      </select>

      <button className="btn" type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );
};