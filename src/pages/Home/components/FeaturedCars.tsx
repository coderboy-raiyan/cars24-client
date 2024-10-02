import Loader from "../../../components/Loader/Loader";
import { useGetFeaturedCarsQuery } from "../../../redux/features/rider/car.api";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import FeaturedCarItem from "../../../components/Car/FeaturedCarItem";

function FeaturedCars() {
  const { data, isLoading } = useGetFeaturedCarsQuery(null);
  console.log(data);

  return (
    <section className="bg-[#fafafa]">
      <div className="py-10 max-w-7xl mx-auto">
        <h1 className="text-center text-2xl font-semibold">Featured Cars</h1>

        {/* Slider */}

        {isLoading ? (
          <Loader />
        ) : (
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="mySwiper"
          >
            {new Array(10).fill(data?.data[0]).map((car) => (
              <SwiperSlide key={car?._id} className="my-10">
                <FeaturedCarItem {...car} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

export default FeaturedCars;
