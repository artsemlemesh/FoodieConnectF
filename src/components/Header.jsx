
const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <h1 className="text-xl font-bold">FoodieConnect</h1>
      <nav className="space-x-4">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/restaurants" className="hover:underline">
          Restaurants
        </a>
        <a href="/orders" className="hover:underline">
          Orders
        </a>
      </nav>
    </header>
  );
};

export default Header;