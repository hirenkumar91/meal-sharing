import { getApiUrl } from "./api";

export interface Meal {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  max_reservations: number;
  averagestars: number;
  availablereservations: number;
}

export const fetchMeals = async (): Promise<Meal[]> => {
  const url = getApiUrl("api/meal");

  if (!url) {
    throw new Error("Invalid API URL");
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }

  return response.json();
};

export interface Review {
  meal_id: string;
  stars: number;
}

export const fetchReviews = async (): Promise<Review[]> => {
  const url = getApiUrl("api/reviews");

  if (!url) {
    throw new Error("Invalid API URL");
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return response.json();
};
