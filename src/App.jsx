import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AnimatedComponent from './components/testComponets/AnimatedComp';
import './tailwind.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OrderFood from './pages/OrderFood';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="order-food" element={<OrderFood />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
