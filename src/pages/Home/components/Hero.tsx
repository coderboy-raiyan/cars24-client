import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

const carBrands = [
  "https://fastly-production.24c.in/cars24/brand/12330d28-b357-4010-8d0c-6141a3f82e48MARUTISUZUKI17.png",
  "https://fastly-production.24c.in/cars24/brand/b62fd2e2-d183-49f0-a09a-c22dfe30f724HYUNDAInew.png",
  "https://fastly-production.24c.in/cars24/brand/b391b164-ebad-421a-9c8d-164c2adfb58dHONDAnew.png",
  "https://fastly-production.24c.in/cars24/brand/fdafe75f-62ea-4cb9-8fca-3d57863a1e75TATAnew.png",
  "https://fastly-production.24c.in/cars24/brand/10bca004-b88b-465f-9f77-0eb7da2d7baaRENAULTnew.png",
  "https://fastly-production.24c.in/cars24/brand/6c77d5ff-f3be-4c85-a870-6b1a2b2957f9Mahindranew.png",
  "https://fastly-production.24c.in/cars24/brand/768d96aa-d966-4e6e-89fb-40c7fc32eb46FORDnew.png",
];

function Hero() {
  return (
    <div className="bg-[url('https://fastly-production.24c.in/india/cms/prod/banners/root/2024/07/20/0dedebd5-c0cb-47e4-a543-e2ee0394c3c3-superweb_banner.webp')] relative bg-no-repeat bg-cover h-[500px] mb-20">
      <div className="max-w-[70%] mx-auto pt-20">
        <div className="text-white flex items-center space-x-4 mb-5 ">
          <h1 className="text-3xl font-bold">Welcome to</h1>
          <img
            src="https://s3.ap-south-1.amazonaws.com/com.cars24.images/production/india/homepage/cars24_web_super.png"
            alt=""
            className="w-[80px]"
          />
        </div>
        <div>
          <h1 className="text-6xl text-white font-semibold">
            Your all-in-one car <br /> universe
          </h1>
        </div>
      </div>

      {/* search area */}

      <div className="bg-white h-[200px] w-[70%] absolute bottom-[-150px] shadow-lg p-4 rounded-2xl left-[50%] right-[50%] -translate-x-[50%] -translate-y-[50%]">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow text-sm"
            placeholder="Search by car name"
          />
          <BiSearch />
        </label>

        <div className="flex items-center mt-10">
          <div className="w-[80%] flex justify-center items-center space-x-5">
            {carBrands?.map((img, i) => (
              <Link to="" key={i}>
                <img src={img} alt="" className="w-[60px]" />
              </Link>
            ))}
          </div>
          <button className="bg-[#ef6e0b] hover:bg-[#d1600a] text-white py-2 px-4 rounded w-[20%] text-sm font-semibold">
            Book now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
