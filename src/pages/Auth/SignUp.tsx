import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import InputField from "../../components/Input/InputField";
import { AuthValidations } from "./utils/auth.utils";

type TInputFields = {
  email: string;
  password: string;
  confirmPassword: string;
  contactNo: string;
  agree: boolean;
};

function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TInputFields>({
    resolver: zodResolver(AuthValidations.signUpValidationSchema),
  });

  const onSubmit: SubmitHandler<TInputFields> = (data) => {
    console.log(data);
  };

  return (
    <div className="grid grid-cols-2">
      <img
        src="https://assets.cars24.com/production/c2b-website/240920151904/js/a4fc97bb073cef132255dcf77755b6f5.png"
        alt=""
        className=""
      />

      {/* form */}
      <div className="w-[60%] mx-auto my-10">
        <div>
          <h1 className="text-3xl">
            <span className="font-semibold">Sign up</span> to <br />
            continue
          </h1>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="email"
            label="Email"
            type="email"
            register={register}
            placeholder="Email"
            errors={errors}
          />

          <InputField
            name="password"
            label="Password"
            type="password"
            register={register}
            placeholder="Password"
            errors={errors}
          />

          <InputField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            register={register}
            placeholder="Confirm password"
            errors={errors}
          />

          <InputField
            name="contactNo"
            label="Contact number"
            type="text"
            register={register}
            placeholder="+8801XXXXX"
            errors={errors}
          />

          <p className="text-sm font-normal">
            Already have an account?{" "}
            <Link className="font-semibold text-primary" to="/sign-in">
              Sign in
            </Link>
          </p>
          <div className="flex items-center text-sm space-x-4">
            <input
              {...register("agree")}
              type="checkbox"
              name="agree"
              className="checkbox"
              required
            />
            <p>
              I accept
              <Link
                className="text-primary hover:underline"
                to="/terms-and-conditions"
              >
                terms and conditions
              </Link>
            </p>
          </div>
          <button className="primary-btn w-2/6" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
