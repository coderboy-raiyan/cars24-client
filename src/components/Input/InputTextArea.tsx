/* eslint-disable @typescript-eslint/no-explicit-any */
type TInput = {
  placeholder?: string;
  register?: any;
  name: string;
  label?: string;
  errors?: any;
};

function InputTextArea({ placeholder, name, label, register, errors }: TInput) {
  const attr: any = {};

  attr[name] = {};

  if (register) {
    attr[name] = register(name);
  }

  return (
    <label htmlFor={name}>
      <p className="text-sm font-semibold text-gray-600 my-2">{label}</p>
      <textarea
        className={`border rounded-md py-2 text-sm w-full hover:outline-none hover:ring-0 px-4 shadow focus:ring-0 focus:outline-none ${
          errors?.[`${name}`] && "border-red-600"
        }`}
        id={name}
        placeholder={placeholder}
        {...attr[name]}
        required
      />
      {errors && errors[`${name}`] && (
        <p className="text-xs font-medium text-red-600">
          {errors?.[`${name}`].message}
        </p>
      )}
    </label>
  );
}

export default InputTextArea;
