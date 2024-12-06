import Link from "next/link";
import { Meal } from "../app/utils/fetchData"; // Import the type Meal

// Define the props for the Card component
interface CardProps {
  meal: Meal; // Type the `meal` prop as `Meal`
  setSelectedMealID: (id: string) => void; // Define `setSelectedMealID` as a function that takes a string (meal ID)
}

const Card = ({ meal, setSelectedMealID }: CardProps) => {
  return (
    <div
      className="card bg-base-100 w-96 shadow-xl flex justify-between"
      key={meal.id}
    >
      <figure className="px-10 pt-10"></figure>
      <div className="card-body items-center text-center">
        <h1 className="card-title">{meal.averagestars}</h1>
        <h2 className="card-title">{meal.title}</h2>
        <p>{meal.description}</p>
        <div className="card-actions">
          <Link
            href="/meal/carddetails"
            className="btn btn-primary"
            onClick={() => setSelectedMealID(meal.id)}
          >
            More
          </Link>
        </div>
        <p>Available Spot: {meal.availablereservations}</p>
      </div>
    </div>
  );
};

export default Card;
