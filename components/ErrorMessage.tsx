"use client";

interface ErrorProps {
  message?: string;
  type?: string;
}

const ErrorMessage: React.FC<ErrorProps> = ({ message, type }) => {
  return (
    <div className="w-full p-2 bg-rose-500 rounded-md ">
      {type === "password"
        ? `      Must contain ${message?.toLowerCase()}`
        : `${message}`}
    </div>
  );
};

export default ErrorMessage;
