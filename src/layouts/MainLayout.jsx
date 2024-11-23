import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Outlet /> 
        {/* in outlet there are children */}
      </main>
      <Footer/>
    </div>
  );
};


export default MainLayout
