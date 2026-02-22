import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ rating }) => {
  // If rating is empty, treat it as 0
  const safeRating = rating || 0;

  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {[1, 2, 3, 4, 5].map((star) => {
        if (safeRating >= star) {
          return <FaStar key={star} />;
        } else if (safeRating >= star - 0.5) {
          return <FaStarHalfAlt key={star} />;
        } else {
          return <FaRegStar key={star} />;
        }
      })}
    </div>
  );
};

export default Rating;