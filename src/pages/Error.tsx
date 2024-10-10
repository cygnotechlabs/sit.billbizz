
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Something went wrong. The page you're looking for might have been removed or is temporarily unavailable.
        </p>
        <button
          onClick={handleGoBack}
          className="inline-block px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
