import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/Input/InputField";
import { useRegisterRiderMutation } from "../../redux/features/authApi";
import { setUser } from "../../redux/features/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import verifyJwt from "../../utils/verifyJwt";
import { AuthValidations } from "./utils/auth.utils";

type TInputFields = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNo: string;
  agree: boolean;
};

function SignUp() {
  const [signUpHandler, { isLoading }] = useRegisterRiderMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TInputFields>({
    resolver: zodResolver(AuthValidations.signUpValidationSchema),
  });

  const onSubmit: SubmitHandler<TInputFields> = async (data) => {
    try {
      const body = {
        email: data?.email,
        password: data?.password,
        contactNo: data?.contactNo,
        name: data?.name,
      };

      const result = await signUpHandler(body).unwrap();
      const user = verifyJwt(result?.data?.accessToken);
      dispatch(setUser({ user: user, accessToken: result?.data?.accessToken }));
      toast.success("Signed up successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message, { className: "text-sm" });
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <img
        src="https://assets.cars24.com/production/c2b-website/240920151904/js/a4fc97bb073cef132255dcf77755b6f5.png"
        alt="block "
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
            name="name"
            label="Name"
            type="text"
            register={register}
            placeholder="Name"
            errors={errors}
          />
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
              I accept <span> </span>
              <Link
                className="text-primary hover:underline"
                to="/terms-and-conditions"
              >
                terms and conditions
              </Link>
            </p>
          </div>
          {isLoading ? (
            <button className="primary-btn flex items-center justify-center space-x-2 w-full">
              <span className="loading loading-spinner"></span>
              <span>Please wait...</span>
            </button>
          ) : (
            <button className="primary-btn w-full" type="submit">
              Sign up
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
