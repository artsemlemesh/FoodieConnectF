import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthForm from '../components/MyCards/AuthForm';
import { useAppContext } from '../context/GlobalContext';
import Modal from '../components/Modal';

const MainLayout = () => {
  const { isModalOpen, closeModal, isLogin, handleLogin, handleRegister } =
    useAppContext();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Modal
        title={isLogin ? 'Login' : 'Register'}
        content={
          <AuthForm
            type={isLogin ? 'login' : 'register'}
            onSubmit={isLogin ? handleLogin : handleRegister}
          />
        }
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
        {/* in outlet there are children */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
