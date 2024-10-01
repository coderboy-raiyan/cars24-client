import { Rating } from "@smastrom/react-rating";
import { useNavigate } from "react-router-dom";
import { TCar } from "../../../types/car.type";

function Car({
  name,
  images,
  description,
  pricePerHour,
  slug,
  review: { totalRating, avgRating },
}: TCar) {
  const navigate = useNavigate();

  return (
    <div className="card bg-base-100 shadow-xl">
      <img
        className="h-[180px] object-cover rounded-t-2xl"
        src={images[0]?.secure_url}
        alt="Shoes"
      />

      <div className="card-body">
        <h2 className="card-title text-2xl">{name}</h2>
        <h4 className="text-lg font-semibold">
          Per hour : <span className="text-btn-base">${pricePerHour}</span>
        </h4>
        <div className="flex items-center text-sm w-full font-semibold ">
          <div className="text-sm flex items-center space-x-1">
            <p>{avgRating}</p>
            <Rating className="w-16" value={avgRating} readOnly />
          </div>
          <span className="mx-2">{totalRating} review</span>
        </div>
        <p>{description.slice(0, 100)}...</p>
        <div className="card-actions">
          <button
            onClick={() => navigate(`/cars/${slug}`)}
            className="primary-btn w-full my-2"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Car;
