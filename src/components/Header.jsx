import { useAppContext } from "../context/GlobalContext";

const Header = () => {

 const {openModal} = useAppContext();

  return (
    <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">FoodieConnect</h1>
          <nav className="space-x-4">
          <button onClick={openModal} className="hover:underline">
            Login/Register
          </button>
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
            <a href="/checkout" className="hover:underline">
              Checkout 
            </a>
            <a href="/cart" className="hover:underline">
              Cart
            </a>
          </nav>
        </div>
      </header>
  );
};

export default Header;