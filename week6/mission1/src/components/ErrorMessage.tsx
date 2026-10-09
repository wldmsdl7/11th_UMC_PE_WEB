interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center ">
      <p className="text-center text-red-600 text-2xl sm:text-3xl md:text-2xl font-bold p-4">
        {message}
      </p>
    </div>
  );
}