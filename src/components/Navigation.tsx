
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Users, Menu, X } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Players', path: '/players', icon: <Users size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-gjakova-black border-r border-gjakova-gray/20 animate-fade-in">
        <div className="w-full flex flex-col p-6">
          <div className="mb-10 flex items-center justify-center">
            <h1 className="text-2xl font-bold red-gradient-text">Gjakova FC</h1>
          </div>
          
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-md transition-all duration-300",
                  isActive(item.path)
                    ? "bg-gjakova-red/10 text-gjakova-red"
                    : "text-white/70 hover:bg-gjakova-gray/10 hover:text-white"
                )}
              >
                <span className={cn("mr-3", isActive(item.path) && "text-gjakova-red")}>{item.icon}</span>
                <span className="font-medium">{item.name}</span>
                {isActive(item.path) && (
                  <span className="ml-auto w-1.5 h-6 bg-gjakova-red rounded-full" />
                )}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto">
            <div className="flex items-center p-4 glass-card rounded-lg">
              <div className="ml-2">
                <p className="text-xs text-white/60">Payment Tracker</p>
                <p className="text-sm font-semibold">Gjakova FC</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <div className="block md:hidden fixed top-0 left-0 right-0 z-20 bg-gjakova-black/95 backdrop-blur-lg border-b border-gjakova-gray/20 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold red-gradient-text">Gjakova FC</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/80 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="block md:hidden fixed inset-0 z-10 bg-gjakova-black/95 mt-16 animate-fade-in">
          <div className="flex flex-col p-6 pt-10 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-4 rounded-md transition-all",
                  isActive(item.path)
                    ? "bg-gjakova-red/10 text-gjakova-red"
                    : "text-white/70 hover:bg-gray-800 hover:text-white"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
                {isActive(item.path) && (
                  <span className="ml-auto w-1.5 h-6 bg-gjakova-red rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
