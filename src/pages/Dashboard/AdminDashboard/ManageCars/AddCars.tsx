import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
  const { handleSubmit, register, reset } = useForm<TAddCarsFields>();
  const [colors, setColors] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [feature, setFeature] = useState<string>("");
  const [files, setFiles] = useState<any>([]);
  const [handleCreateCar, { isLoading }] = useCreateCarMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (fieldValues) => {
    if (!features?.length) {
      toast.error("Please add some feature!");
      return;
    }
    if (!colors?.length) {
      toast.error("Please add a car available colors!");
      return;
    }
    try {
      const formData = new FormData();
      const carData = {
        ...fieldValues,
        pricePerHour: parseInt(fieldValues.pricePerHour),
        color: colors,
        features,
      };
      formData.append("data", JSON.stringify(carData));
      for (const file of files) {
        formData.append("files", file);
      }
      await handleCreateCar(formData).unwrap();
      toast.success("Car created successfully", { className: "text-sm" });
      setFeatures([]);
      setFeature("");
      setColors([]);
      reset();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toast.error("Internal Server Error!");
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
                {features?.map((feature, i) => (
                  <div key={i} className="relative">
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
              name="feature"
              onChange={(e) => setFeature(e.target.value)}
              value={feature}
              onKeyDown={(e) => {
                e.stopPropagation();
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
          <input
            type="file"
            multiple
            name="files"
            onChange={(e) => {
              setFiles(e.target.files);
            }}
            required
            accept=".png,.jpg"
          />
        </div>

        {/* Electric */}
        <div className="w-[140px]">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Is it electric?</span>
              <input
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
