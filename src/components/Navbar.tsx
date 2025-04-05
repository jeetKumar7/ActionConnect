
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Globe, 
  BookOpen, 
  Heart, 
  Users, 
  MessageSquare 
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigation = [
    { name: 'Content Library', to: '/content-library', icon: BookOpen },
    { name: 'Interactive Map', to: '/map', icon: Globe },
    { name: 'Find Your Passion', to: '/passion-finder', icon: Heart },
    { name: 'Action Hub', to: '/action-hub', icon: Users },
    { name: 'Community', to: '/community', icon: MessageSquare },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-teal-400 font-bold text-2xl">Action</span>
              <span className="text-navy-700 font-bold text-2xl">Connect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="flex items-center px-3 py-2 text-sm font-medium text-navy-700 hover:text-teal-400 hover:bg-teal-50 rounded-md"
              >
                <item.icon className="h-4 w-4 mr-1" />
                {item.name}
              </Link>
            ))}

            <div className="ml-4 flex items-center space-x-2">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative rounded-full">
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-teal-400 flex items-center justify-center text-white">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-4 py-3">
                      <p className="text-sm">Signed in as</p>
                      <p className="text-sm font-medium truncate">{user?.email || 'user@example.com'}</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    asChild
                    className="text-navy-700 hover:text-teal-400"
                  >
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button asChild className="bg-teal-400 hover:bg-teal-500 text-white">
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-navy-700 hover:text-teal-400 hover:bg-teal-50"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-3 space-y-1 shadow-lg animate-fade-in">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="flex items-center px-4 py-2 text-base font-medium text-navy-700 hover:text-teal-400 hover:bg-teal-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon className="h-5 w-5 mr-2" />
              {item.name}
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              {isAuthenticated ? (
                <>
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-teal-400 flex items-center justify-center text-white">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-navy-700">{user?.name || 'User Name'}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email || 'user@example.com'}</div>
                  </div>
                </>
              ) : (
                <div className="w-full flex flex-col space-y-2">
                  <Button asChild className="w-full">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
            {isAuthenticated && (
              <div className="mt-3 space-y-1">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-base font-medium text-navy-700 hover:text-teal-400 hover:bg-teal-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-base font-medium text-navy-700 hover:text-teal-400 hover:bg-teal-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-navy-700 hover:text-teal-400 hover:bg-teal-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
