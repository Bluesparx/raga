import { Link } from "react-router-dom";
import { FaRegSadTear } from "react-icons/fa";
import { Vortex } from "../ui/vortex";
const PageNotFound = () => {
  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <Vortex className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-lg mx-auto rounded-lg p-10 bg-clip-padding backdrop-filter backdrop-blur-xl bg-white/10 bg-opacity-30 shadow-lg shadow-violet-400 text-center space-y-6">
          <FaRegSadTear className="text-8xl text-violet-400 mx-auto animate-bounce mb-4" />

          <h1 className="text-6xl font-bold leading-tight text-gray-100">
            404
          </h1>

          <h2 className="text-3xl font-semibold mt-2 text-gray-200">
            Oh no! Page Not Found
          </h2>

          <p className="text-lg text-gray-300 mt-2">
            The page you are looking for does not exist.
            <br />
            But don’t worry, you can find your way back!
          </p>

          <Link
            to="/"
            className="inline-block px-6 py-3 bg-violet-400 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-md text-sm text-white md:text-lg transition-all duration-300 transform hover:scale-105"
          >
            Go Back Home
          </Link>
        </div>
      </Vortex>
    </div>
  );
};

export default PageNotFound;
