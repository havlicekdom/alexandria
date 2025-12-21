import { FieldError, UseFormRegister } from 'react-hook-form';

type FormInputProps = {
  label: string;
  fieldName: string;
  error: FieldError | undefined;
  register: UseFormRegister<any>;
  type: 'text' | 'password' | 'email' | 'number';
  value?: string;
};

export default function FormInput({
  label, fieldName, error, register, type, ...rest
}: FormInputProps) {
  return (
    <label className={`block mb-8 last-of-type:mb-0 ${error ? 'text-error' : ''}`}>
      { label }
      <input
        {...register(fieldName)}
        className={`block w-full bg-transparent border-b border-gray-400 p-4 mt-4 text-base outline-none ${error ? 'border-error! text-error' : ''}`}
        type={type}
        {...rest}
      />
      {error && (
        <span className="inline-block text-error mt-4">
          { error?.message }
        </span>
      )}
    </label>
  );
}
