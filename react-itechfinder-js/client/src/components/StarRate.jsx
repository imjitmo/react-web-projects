import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaStar } from 'react-icons/fa6';

export default function StarRate(props) {
  const { id, shopId, rating, setRateSuccess, userFilter } = props;
  const [starRating, setStarRating] = useState(rating || 0);
  const [rateColor, setRateColor] = useState(0);

  const handleClick = async () => {
    if (starRating === 0) {
      toast.error('Please select a rating', { id: 'rtMsg', position: 'bottom-center' });
      return;
    }
    try {
      const res = await fetch(`/api/appointment/rate/${id}/${shopId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: starRating }),
      });
      const data = await res.json();
      setRateSuccess(data);
      toast.success('Thank you for rating', { id: 'rtMsg', position: 'bottom-center' });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      {[...Array(5)].map((star, i) => {
        const currentRate = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rate"
              value={currentRate}
              onClick={() => setStarRating(currentRate)}
              hidden
              disabled={userFilter || props?.rating > 0}
            />
            <FaStar
              className={`size-6 ${
                currentRate <= (rateColor || starRating) ? 'fill-yellow-500' : 'fill-blue-200'
              }`}
            />
          </label>
        );
      })}
      {props?.rating === 0 && !userFilter && (
        <button className="btn primary-btn" onClick={handleClick}>
          Rate Now
        </button>
      )}
    </div>
  );
}
