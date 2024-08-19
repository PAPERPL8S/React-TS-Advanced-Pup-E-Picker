import React, { useState } from "react";
import { useDogs } from "../Context/DogContext";
import { postDog } from "../api";
import { toast } from "react-hot-toast";
import { dogPictures } from "../dog-pictures";

interface Dog {
  name: string;
  picture: string;
  isFavorite: boolean;
}

export const CreateDogForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refreshDogs } = useDogs();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await postDog({
        name,
        description,
        picture: selectedImage,
        isFavorite: false,
      } as Dog);
      toast.success("Dog Created");
      refreshDogs();
      setName("");
      setDescription("");
      setSelectedImage(dogPictures.BlueHeeler);
    } catch (error) {
      toast.error("Failed to create dog");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isSubmitting}
        required
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isSubmitting}
        required></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id="picture"
        value={selectedImage}
        onChange={(e) => setSelectedImage(e.target.value)}
        disabled={isSubmitting}>
        {Object.entries(dogPictures).map(([label, pictureValue]) => (
          <option value={pictureValue} key={pictureValue}>
            {label}
          </option>
        ))}
      </select>
      <input type="submit" value="Submit" disabled={isSubmitting} />
    </form>
  );
};
