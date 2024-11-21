import React from 'react';
import AuthForm from '../../components/MyCards/AuthForm';

export default {
  title: 'Organisms/AuthForm',
  component: AuthForm,
};

const Template = (args) => <AuthForm {...args} />;

export const Login = Template.bind({});
Login.args = {
  type: 'login',
  onSubmit: () => alert('Login Submitted!'),
};

export const Register = Template.bind({});
Register.args = {
  type: 'register',
  onSubmit: () => alert('Registration Submitted!'),
};