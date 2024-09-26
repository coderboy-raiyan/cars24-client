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

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../../../../components/Input/InputField";
import InputTextArea from "../../../../components/Input/InputTextArea";

type TAddCarsFields = {
  name: string;
  carType: string;
  color: string;
  description: string;
  features: string;
  isElectric: boolean;
  pricePerHour: number;
};

function AddCars() {
  const { handleSubmit, register } = useForm<TAddCarsFields>();

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    console.log(formData);
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
        <InputTextArea
          name="description"
          label="Description"
          register={register}
        />

        {false ? (
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
