import React from 'react';
import AuthForm from '../../components/MyCards/AuthForm';
import { Provider, useDispatch } from 'react-redux';
import { loginUser } from '../../features/authSlice';
import store from '../../store/store';

export default {
  title: 'Organisms/AuthForm',
  component: AuthForm,
};

const Template = (args) => (
  <Provider store={store}>
    <AuthForm {...args} />
  </Provider>
);

export const Login = Template.bind({});
Login.args = {
  type: 'login',
  onSubmit: () => {
    const username = 'admin';
    const password = 'admin';
    store.dispatch(loginUser({ username, password }));
    console.log('Login action dispatched with:', { username, password });
  },
};

export const Register = Template.bind({});
Register.args = {
  type: 'register',
  onSubmit: () => alert('Registration Submitted!'),
};
