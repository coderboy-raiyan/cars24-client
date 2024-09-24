import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/Input/InputField";
import { useLoginMutation } from "../../redux/features/authApi";
import { setUser } from "../../redux/features/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import verifyJwt from "../../utils/verifyJwt";
import { AuthValidations } from "./utils/auth.utils";

type TInputFields = {
  email: string;
  password: string;
};

function SignIn() {
  const [signInHandler, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TInputFields>({
    resolver: zodResolver(AuthValidations.signInValidationSchema),
  });

  const onSubmit: SubmitHandler<TInputFields> = async (data) => {
    try {
      const result = await signInHandler(data).unwrap();
      const user = verifyJwt(result?.data?.accessToken);
      dispatch(setUser({ user, accessToken: result?.data?.accessToken }));
      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message, { className: "text-sm" });
    }
  };

  return (
    <div className="grid grid-cols-2">
      <img
        src="https://assets.cars24.com/production/c2b-website/240920151904/js/a4fc97bb073cef132255dcf77755b6f5.png"
        alt=""
        className="w-full h-screen object-cover"
      />

      {/* form */}
      <div className="w-[60%] mx-auto my-10">
        <div>
          <h1 className="text-3xl">
            <span className="font-semibold">Log in</span> to <br />
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

          <p className="text-sm font-normal">
            Don't have an account?{" "}
            <Link className="font-semibold text-primary" to="/sign-up">
              Sign up
            </Link>
          </p>
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
    </div>
  );
}

export default SignIn;
