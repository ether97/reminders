"use client";

interface ErrorProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorProps> = ({ message }) => {
  return <div className="w-full p-2 bg-rose-500 rounded-md ">{message}</div>;
};

export default ErrorMessage;
