import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../../components/Loader/Loader";
import { useGetSingleCarUsingSlugQuery } from "../../redux/features/rider/car.api";
import { TCar } from "../../types/car.type";
import "./styles/car.style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

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

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <section className="max-w-7xl mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 my-10 h-screen">
          {/* slide */}
          <div className="mx-4">
            <div className="slider-container ">
              <Swiper
                style={
                  {
                    height: "400px",
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                    borderRadius: "10px",
                  } as any
                }
                loop={true}
                spaceBetween={10}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                navigation={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {car?.images?.map((img) => (
                  <SwiperSlide key={img?.public_id}>
                    <div className="">
                      <img
                        className="h-[400px] mx-auto object-contain rounded-xl"
                        src={img?.secure_url}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {car?.images?.map((img) => (
                  <SwiperSlide
                    key={img?.public_id}
                    className="h-[100px] rounded-xl"
                  >
                    <img
                      src={img?.secure_url}
                      className="rounded-xl object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
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
