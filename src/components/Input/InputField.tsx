type TInput = {
  type: string;
  placeholder?: string;
  register?: any;
  name: string;
  label?: string;
  errors?: any;
};

function InputField({
  type,
  placeholder,
  name,
  label,
  register = {},
  errors,
}: TInput) {
  return (
    <label htmlFor={name}>
      <p className="text-sm font-semibold text-gray-600 my-2">{label}</p>
      <input
        className={`border rounded-md py-2 text-sm w-full hover:outline-none hover:ring-0 px-4 shadow focus:ring-0 focus:outline-none ${
          errors?.[`${name}`] && "border-red-600"
        }`}
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name)}
        required
      />
      {errors[`${name}`] && (
        <p className="text-sm font-medium text-red-600">
          {errors?.[`${name}`].message}
        </p>
      )}
    </label>
  );
}

export default InputField;
