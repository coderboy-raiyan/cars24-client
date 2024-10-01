import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { IoIosPricetags } from "react-icons/io";
import { MdReviews } from "react-icons/md";
import { TbBrandAirbnb } from "react-icons/tb";
import { useGetAllCarsQuery } from "../../redux/features/rider/car.api";
import Car from "./components/Car";

function Cars() {
  const { data } = useGetAllCarsQuery(null);
  const [priceRange, setPriceRange] = useState("");
  console.log(priceRange);
  console.log(data);
  return (
    <section className="bg-gray-100">
      <div className="grid grid-cols-10 py-10 max-w-7xl mx-auto">
        {/* filters */}
        <div className="col-span-2">
          <div className="bg-white border-2 border-gray-100 shadow-xl shadow-[#cce2f2] p-4 rounded-lg flex flex-col space-y-8 sticky top-20">
            {/* budget */}
            <div className="space-y-4">
              <div className="text-sm font-semibold flex items-center space-x-2 text-gray-600">
                <IoIosPricetags /> <span>Budget</span>
              </div>
              <div className="space-x-2 flex justify-between items-center">
                <span className="flex-1 text-sm border block rounded-md py-2 px-4 font-semibold text-center">
                  $100
                </span>
                <span className="flex-1 text-sm border block rounded-md py-2 px-4 font-semibold text-center">
                  ${priceRange ? priceRange : "500"}
                </span>
              </div>
              <div>
                <input
                  type="range"
                  min={0}
                  max="500"
                  className="range"
                  step="100"
                  onChange={(e) => setPriceRange(e.target.value)}
                />
                <div className="flex w-full justify-between px-2 text-xs">
                  <span>|</span>
                  <span>|</span>
                  <span>|</span>
                  <span>|</span>
                  <span>|</span>
                </div>
              </div>
            </div>

            {/* Ratings */}
            <div>
              <div className="text-sm mb-2 font-semibold flex items-center space-x-2 text-gray-600">
                <MdReviews /> <span>Ratings filter</span>
              </div>

              <div>
                {[1, 2, 3, 4, 5].reverse().map((num) => (
                  <Rating
                    style={{ maxWidth: 180 }}
                    className="w-28 cursor-pointer"
                    value={num}
                    key={num}
                    readOnly
                  />
                ))}
              </div>
            </div>

            {/* models */}
            <div>
              <div className="text-sm font-semibold mb-4 flex items-center space-x-2 text-gray-600">
                <TbBrandAirbnb /> <span>Brands</span>
              </div>
              <ul className="space-y-1">
                <li className="flex items-center text-sm font-semibold space-x-2">
                  <input type="checkbox" className="checkbox" name="tesla" />
                  <span>Tesla</span>
                </li>
                <li className="flex items-center text-sm font-semibold space-x-2">
                  <input type="checkbox" className="checkbox" name="tesla" />
                  <span>Toyota</span>
                </li>
                <li className="flex items-center text-sm font-semibold space-x-2">
                  <input type="checkbox" className="checkbox" name="tesla" />
                  <span>Toyota</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* cars */}
        <div className="col-span-8 mx-10">
          <div className="grid grid-cols-3">
            {data?.data?.map((car) => (
              <Car {...car} key={car?._id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cars;
