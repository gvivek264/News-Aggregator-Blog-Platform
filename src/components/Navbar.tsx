import { Newspaper, PenSquare, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, signInWithGoogle, logout, error, clearError } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGoogle();
    } catch (error) {
      // Error is handled in AuthContext
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Newspaper className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-800">NewsHub</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-8">
              <Link to="/news" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <Search className="h-5 w-5" />
                <span>News Search</span>
              </Link>
              <Link to="/blog" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <PenSquare className="h-5 w-5" />
                <span>Blog</span>
              </Link>
              {user ? (
                <div className="flex items-center space-x-4">
                  <img
                    src={user.photoURL || ''}
                    alt={user.displayName || ''}
                    className="h-8 w-8 rounded-full"
                  />
                  <button
                    onClick={() => logout()}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  disabled={isSigningIn}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSigningIn ? 'Signing In...' : 'Sign In'}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Error Alert */}
      {error && (
        <div className="fixed top-4 right-4 max-w-md bg-red-50 border-l-4 border-red-500 p-4 shadow-lg rounded">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button
              onClick={clearError}
              className="ml-4 inline-flex text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}