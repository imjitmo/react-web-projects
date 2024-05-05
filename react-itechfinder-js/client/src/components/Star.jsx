import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { IoStarOutline } from 'react-icons/io5';
export default function Star(props) {
  const { stars, reviews } = props;
  const starRating = Array.from({ length: 5 }, (e, i) => {
    let ratingValue = i + 0.5;
    return (
      <span key={i}>
        {stars >= i + 1 ? (
          <FaStar className="size-4 fill-yellow-500" />
        ) : stars >= ratingValue ? (
          <FaStarHalfAlt className="size-4 fill-yellow-500" />
        ) : (
          <IoStarOutline className="size-4" />
        )}
      </span>
    );
  });
  return (
    <div className="container">
      <div className="flex flex-row gap-1 items-center text-sm">
        <strong>Ratings: </strong>
        <span className="flex flex-row gap-1 items-center">{starRating}</span>
        <p>({reviews})</p>
      </div>
    </div>
  );
}
