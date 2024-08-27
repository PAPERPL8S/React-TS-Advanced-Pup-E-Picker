const API_BASE_URL = "http://localhost:3000/dogs";

export interface Dog {
  id?: number;
  name: string;
  isFavorite: boolean;
  picture?: string;
}

const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Request failed");
  }
  return response.json();
};

export const getAllDogs = async (): Promise<Dog[]> => {
  try {
    const response = await fetch(API_BASE_URL);
    return await checkResponse(response);
  } catch (error) {
    console.error("Error fetching all dogs:", error);
    throw error;
  }
};

export const createDog = async (dogData: Dog): Promise<Dog> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dogData),
    });
    return await checkResponse(response);
  } catch (error) {
    console.error("Error creating dog:", error);
    throw error;
  }
};

export const deleteDog = async (dogId: number): Promise<number> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${dogId}`, {
      method: "DELETE",
    });
    await checkResponse(response);
    return dogId;
  } catch (error) {
    console.error("Error deleting dog:", error);
    throw error;
  }
};

export const patchFavoriteForDog = async (
  dogId: number,
  isFavorite: boolean,
): Promise<Dog> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavorite }),
    });
    return await checkResponse(response);
  } catch (error) {
    console.error("Error updating dog favorite status:", error);
    throw error;
  }
};
