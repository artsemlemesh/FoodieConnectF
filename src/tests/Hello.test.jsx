// src/components/__tests__/Hello.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Hello from './Hello';

test('renders Hello component with name', () => {
  render(<Hello name="World" />);
  const headingElement = screen.getByText(/Hello, World!/i);
  expect(headingElement).toBeInTheDocument();
});
