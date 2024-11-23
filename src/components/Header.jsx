
const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">FoodieConnect</h1>
          <nav className="space-x-4">
            <a href="/" className="hover:underline">
              Home
            </a>
            <a href="/about" className="hover:underline">
              About
            </a>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
            <a href="/order-food" className="hover:underline">
              Order Food
            </a>
          </nav>
        </div>
      </header>
  );
};

export default Header;