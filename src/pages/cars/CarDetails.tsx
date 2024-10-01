import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Loader from "../../components/Loader/Loader";
import { useGetSingleCarUsingSlugQuery } from "../../redux/features/rider/car.api";
import { TCar } from "../../types/car.type";
import "./styles/car.style.css";

function CarDetails() {
  const { slug } = useParams();
  const { data, isSuccess, isLoading } = useGetSingleCarUsingSlugQuery(
    slug as string,
    { skip: !slug }
  );
  const [car, setCar] = useState<TCar>({} as TCar);

  useEffect(() => {
    if (isSuccess) {
      setCar(data?.data[0] as TCar);
    }
  }, [isSuccess, slug]);

  const settings = {
    customPaging: function (i: number) {
      return (
        <a className="">
          <img className="" src={`${car?.images[i]?.secure_url}`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 2000,
  };

  return (
    <section className="max-w-7xl mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 my-10 h-screen">
          {/* slide */}
          <div className="">
            <div className="slider-container ">
              <Slider {...settings}>
                {car?.images?.map((img) => (
                  <div className="" key={img?.public_id}>
                    <img
                      className="h-[400px] mx-auto object-contain rounded-xl"
                      src={img?.secure_url}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* car details */}
          <div>
            <div className="border p-10 rounded-2xl shadow">
              <div className="flex space-x-2">
                <h1 className="text-xl font-semibold">{car?.name}</h1>
                <h2 className="badge bg-btn-base text-white font-semibold text-xs">
                  {car?.brand}
                </h2>
              </div>
              {/* features */}
              <div className="flex space-x-2 flex-wrap">
                {car?.features?.map((feature, i) => (
                  <span
                    className="text-xs font-semibold my-2 py-2 px-4 bg-[#fafafa] rounded-md shadow border"
                    key={i}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <p className="my-8 text-sm">{car?.description}</p>
              <hr />
              <div className="flex justify-between my-10">
                <h3 className="text-btn-base text-2xl font-semibold">
                  ${car?.pricePerHour}/hr
                </h3>

                {car?.status === "available" ? (
                  <button className="bg-green-200 text-green-500 text-xs font-semibold py-1 px-2 rounded-2xl">
                    Available
                  </button>
                ) : (
                  <button className="bg-red-200 text-red-500 text-xs font-semibold py-1 px-2 rounded-2xl">
                    Unavailable
                  </button>
                )}
              </div>

              <button
                className="primary-btn w-full disabled:bg-opacity-70"
                disabled={car?.status === "unavailable"}
              >
                Book now
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Reviews */}

      <div className="">
        <h1>Reviews</h1>
      </div>
    </section>
  );
}

export default CarDetails;
