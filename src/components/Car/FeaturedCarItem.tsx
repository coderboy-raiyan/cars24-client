import { Rating } from "@smastrom/react-rating";
import { useNavigate } from "react-router-dom";
import { TCar } from "../../types/car.type";

function FeaturedCarItem({
  name,
  images,
  status,
  pricePerHour,
  slug,
  review: { totalRating, avgRating },
}: TCar) {
  const navigate = useNavigate();

  return (
    <div className="card bg-base-100 shadow-xl relative">
      <img
        className="h-[100px] object-cover rounded-t-2xl"
        src={images[0]?.secure_url}
        alt="Shoes"
      />

      <div className="card-body items-start ">
        {status === "available" ? (
          <button className="bg-green-200 right-0 absolute top-0 text-green-500 text-xs font-semibold py-1 px-2 rounded-2xl">
            Available
          </button>
        ) : (
          <button className="bg-red-200  right-0 absolute top-0 text-red-500 text-xs font-semibold py-1 px-2 rounded-2xl">
            Unavailable
          </button>
        )}
        <h2 className="card-title text-lg w-full justify-between flex">
          <span>{name}</span>
          <span className="text-btn-base text-xs">${pricePerHour}/hr</span>
        </h2>

        <div className="text-sm flex items-center space-x-1">
          <Rating className="w-20" value={avgRating} readOnly />
          <p className="text-xs font-medium">
            {avgRating} / {totalRating} review
          </p>
        </div>

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

export default FeaturedCarItem;
