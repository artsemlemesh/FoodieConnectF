import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/GlobalContext';

const Header = () => {
  const { user, openModal } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-blue-600 text-white h-16 p-4 relative flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">FoodieConnect</h1>

        {/* Hamburger Button (Small Screens) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onMouseEnter={() => setIsMenuOpen(true)}
          className={`p-2 bg-blue-500 rounded-full md:hidden transition-transform duration-300 ${
            isMenuOpen ? 'rotate-90' : 'rotate-0'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Menu for Large Screens */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          <div className="px-4 py-2 md:p-0">
            {user ? (
              <span
                onClick={() => {
                  openModal();
                  closeMenu();
                }}
                className="block md:inline-block hover:underline cursor-pointer"
              >
                Welcome, {user.username}
              </span>
            ) : (
              <button
                onClick={() => {
                  openModal();
                  closeMenu();
                }}
                className="block md:inline-block hover:underline"
              >
                Log in
              </button>
            )}
          </div>
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:underline">
            About
          </NavLink>
          <NavLink to="/contact" className="hover:underline">
            Contact
          </NavLink>
          <NavLink to="/restaurants" className="hover:underline">
            Restaurants
          </NavLink>
          <NavLink to="/cart" className="hover:underline">
            Cart
          </NavLink>
          <NavLink to="/admin" className="hover:underline">
            Dashboard
          </NavLink>
        </nav>

        {/* Navigation Menu for Small Screens */}
        <nav
          onMouseLeave={closeMenu}
          className={`absolute top-16 left-0 w-full bg-blue-600 z-50 md:hidden transition-all duration-300 ease-in-out transform ${
            isMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-5 pointer-events-none'
          }`}
        >
          <div className="px-4 py-2 md:p-0">
            {user ? (
              <span
                onClick={() => {
                  openModal();
                  closeMenu();
                }}
                className="block md:inline-block hover:underline cursor-pointer"
              >
                Welcome, {user.username}
              </span>
            ) : (
              <button
                onClick={() => {
                  openModal();
                  closeMenu();
                }}
                className="block md:inline-block hover:underline"
              >
                Log in
              </button>
            )}
          </div>
          <div className="flex flex-col  ">
            <NavLink to="/" className="hover:underline block px-4 py-2">
              Home
            </NavLink>
            <NavLink to="/about" className="hover:underline block px-4 py-2">
              About
            </NavLink>
            <NavLink to="/contact" className="hover:underline block px-4 py-2">
              Contact
            </NavLink>
            <NavLink to="/restaurants" className="hover:underline block px-4 py-2">
              Restaurants
            </NavLink>
            <NavLink to="/cart" className="hover:underline block px-4 py-2">
              Cart
            </NavLink>
            <NavLink to="/admin" className="hover:underline block px-4 py-2">
              Dashboard
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
