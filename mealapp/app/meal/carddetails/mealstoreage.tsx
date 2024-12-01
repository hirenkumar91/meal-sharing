// Utility function to store the selected meal ID
export const setSelectedMealID = (mealID: string | number) => {
  localStorage.setItem("selectedMealID", mealID.toString()); // Ensure it's stored as a string
};

// Utility function to retrieve the selected meal ID
export const getSelectedMealID = (): string | null => {
  return localStorage.getItem("selectedMealID"); // Returns null if no value is found
};
