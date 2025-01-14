import React from 'react';
import Hello from './Hello';
import {render, screen} from '@testing-library/react';
test('renders Hello component with name', () => {
  render(<Hello name="World" />);
  const headingElement = screen.getByText(/Hello, World!/i);
  expect(headingElement).toBeInTheDocument();
});
