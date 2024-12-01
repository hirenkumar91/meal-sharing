// Utility function to store the selected meal ID
export const setSelectedMealID = (mealID) => {
  localStorage.setItem("selectedMealID", mealID);
};

// Utility function to retrieve the selected meal ID
export const getSelectedMealID = (mealId: number) => {
  return localStorage.getItem("selectedMealID");
};
