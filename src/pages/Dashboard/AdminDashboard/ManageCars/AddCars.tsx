// {
//   "name": "Tesla Model S",
//   "carType": "suv",
//   "color": ["Red"],
//   "description": "A luxurious electric car with autopilot and cutting-edge technology.",
//   "features": [
//     "Autopilot",
//     "All-Wheel Drive",
//     "Heated Seats",
//     "Sunroof"
//   ],
//   "isElectric": true,
//   "pricePerHour": 75.34
// }

import { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoMdImages } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import InputField from "../../../../components/Input/InputField";
import InputTextArea from "../../../../components/Input/InputTextArea";
import { useCreateCarMutation } from "../../../../redux/features/admin/ManageCars/ManageCars.api";

type TAddCarsFields = {
  name: string;
  carType: string;
  description: string;
  isElectric: boolean;
  pricePerHour: number;
};

function AddCars() {
  const { handleSubmit, register } = useForm<TAddCarsFields>();
  const [colors, setColors] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [feature, setFeature] = useState<string>("");
  const filesRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [handleCar, { isLoading }] = useCreateCarMutation();

  useEffect(() => {
    for (const file of files) {
      setImages((prev) => {
        return [...prev, { url: URL.createObjectURL(file), file }];
      });
    }
  }, [files?.length]);

  const onSubmit: SubmitHandler<FieldValues> = async (fieldValues) => {
    try {
      const formData = new FormData();
      const carData = {
        ...fieldValues,
        pricePerHour: parseInt(fieldValues.pricePerHour),
        color: colors,
        features,
      };
      formData.append("data", JSON.stringify(fieldValues));
      for (const file of files) {
        formData.append("files", file);
      }
      console.log(carData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold text-gray-600 border-b pb-2 mb-4">
        Add new cars
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-4">
          <InputField
            type="text"
            name="name"
            label="Car name"
            style="flex-1"
            register={register}
          />
          <InputField
            type="number"
            name="pricePerHour"
            label="Price Per Hour"
            style="flex-1"
            register={register}
          />
        </div>
        <div className="flex items-center space-x-4 my-2">
          <div className="flex-1">
            <InputTextArea
              name="description"
              label="Description"
              register={register}
            />
          </div>
          <div className="flex-1">
            <p className="mb-2 text-sm font-semibold text-gray-600">
              Choose your car type
            </p>
            <select
              className="select select-bordered w-full"
              {...register("carType")}
            >
              <option value="suv">SUV</option>
              <option value="hybrid">Hybrid</option>
              <option value="sedan">Sedan</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-3 border p-4 my-4 rounded shadow">
          {/* color selection input */}
          <div className="rounded my-2 flex-1 min-h-[100px] border-r">
            {colors?.length > 0 && (
              <div className="mb-2 text-sm font-semibold text-gray-600 border-b pb-2">
                <p>Selected colors</p>
                <div className="flex space-x-1 ">
                  {colors?.map((color, i) => (
                    <div className="relative" key={i}>
                      <input
                        type="color"
                        defaultValue={color}
                        className={`size-8  rounded-full shadow-lg  block`}
                        onBlur={(e) => {
                          setColors((prev) => {
                            const newArr = [...prev];
                            newArr[i] = e.target.value;
                            return newArr;
                          });
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setColors((prev) => {
                            return prev.filter(
                              (delColor) => delColor !== color
                            );
                          });
                        }}
                        type="button"
                        className="text-2xl absolute -right-2 bg-white rounded-full text-red-500 hover:animate-bounce -top-1"
                      >
                        <TiDelete />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="mb-2 text-sm font-semibold text-gray-600">
                Choose your car color
              </p>
              <input
                type="color"
                className="cursor-pointer"
                required
                onBlur={(e) => {
                  setColors((prev) => [...prev, e.target.value]);
                }}
              />
            </div>
          </div>

          {/* Features */}
          <div className="rounded-md flex-1 min-h-[100px]">
            {features.length > 0 && (
              <div className="flex space-x-2 flex-wrap  my-3 py-2">
                {features?.map((feature) => (
                  <div className="relative w-[80px]">
                    <div className="p-2 text-center text-sm border shadow bg-gray-100  rounded-full">
                      {feature}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFeatures((prev) => {
                          return prev.filter(
                            (delFeature) => delFeature !== feature
                          );
                        });
                      }}
                      type="button"
                      className="text-2xl absolute -right-2 bg-white rounded-full text-red-500 hover:animate-bounce -top-1"
                    >
                      <TiDelete />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="mb-2 text-sm font-semibold text-gray-600">
              Choose your car features
            </p>
            <input
              className="border rounded-md py-2 text-sm w-full hover:outline-none hover:ring-0 px-4 shadow focus:ring-0 focus:outline-none"
              type="text"
              onChange={(e) => setFeature(e.target.value)}
              value={feature}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setFeatures((prev) => {
                    return [...prev, feature];
                  });
                  setFeature("");
                }
              }}
              placeholder="Press Enter to add feature"
            />
          </div>
        </div>

        {/* upload Image */}
        <div className="border p-4 my-4 rounded shadow">
          <div className="flex flex-wrap space-x-2">
            {images.map((img) => (
              <div className="relative my-2">
                <img
                  src={img?.url}
                  alt=""
                  className="rounded object-contain size-[200px] border p-2"
                />
                <button
                  onClick={() => {}}
                  type="button"
                  className="text-2xl absolute -right-2 bg-white rounded-full text-red-500 hover:animate-bounce -top-1"
                >
                  <TiDelete />
                </button>
              </div>
            ))}
          </div>
          <div
            className="border py-4 rounded-md shadow cursor-pointer  flex justify-center items-center"
            onClick={() => filesRef.current!.click()}
          >
            <IoMdImages className="text-5xl" />
          </div>

          <input
            type="file"
            multiple
            name="files"
            className="hidden"
            ref={filesRef}
            onChange={(e) => {
              setFiles(e.target.files as any);
            }}
            accept=".png,.jpg"
          />
        </div>

        {/* Electric */}
        <div className="w-[140px]">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Is it electric?</span>
              <input
                required
                type="checkbox"
                {...register("isElectric")}
                className="checkbox"
              />
            </label>
          </div>
        </div>

        {isLoading ? (
          <button className="primary-btn flex items-center justify-center space-x-2 w-full">
            <span className="loading loading-spinner"></span>
            <span>Please wait...</span>
          </button>
        ) : (
          <button className="primary-btn w-full" type="submit">
            Sign in
          </button>
        )}
      </form>
    </div>
  );
}

export default AddCars;
