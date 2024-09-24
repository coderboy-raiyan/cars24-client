import { z } from "zod";
const passwordValidationRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
);
const passwordValidationSchema = z
  .string()
  .min(1, { message: "Must have at least 1 character" })
  .regex(passwordValidationRegex, {
    message:
      "At least 6 characters including 1 uppercase Letter and 1 special character!",
  });

const signUpValidationSchema = z
  .object({
    name: z.string().max(50),
    email: z.string().email(),
    password: passwordValidationSchema,
    confirmPassword: passwordValidationSchema,
    contactNo: z
      .string({ message: "Please enter a valid phone number!" })
      .min(11, { message: "Phone number must be at least 11 characters!" })
      .max(11, { message: "Please enter a valid phone number!" }),
    agree: z.boolean(),
  })
  .refine(
    (data) => {
      return data.password === data?.confirmPassword;
    },
    { message: "Password does not match!", path: ["confirmPassword"] }
  );
const signInValidationSchema = z.object({
  email: z.string().email(),
  password: passwordValidationSchema,
});

export const AuthValidations = {
  signUpValidationSchema,
  signInValidationSchema,
};
