
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gjakova-black">
      <div className="glass-card rounded-xl p-10 max-w-md w-full text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gjakova-red/10 text-gjakova-red rounded-full flex items-center justify-center">
            <AlertTriangle size={32} />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl text-white/60 mb-8">Page not found</p>
        <p className="text-white/60 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-gjakova-red text-white font-medium rounded-lg hover:bg-gjakova-dark-red transition-colors w-full"
        >
          <Home size={18} className="mr-2" />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
