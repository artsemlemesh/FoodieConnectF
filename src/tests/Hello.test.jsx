import React from 'react';
// import Greeting from '../Greeting'; // Adjust the import path if necessary
import { render, screen } from '@testing-library/react';
import Greeting from './Hello';

test('renders Greeting component with message', () => {
  const testMessage = "Welcome to the app!";
  render(<Greeting message={testMessage} />);
  
  // Check if the message is rendered correctly
  const headingElement = screen.getByText(testMessage);
  
  // Use toBeTruthy to check if the element exists
  expect(headingElement).toBeTruthy();
  
  // Alternatively, you can check the text content directly
  expect(headingElement.textContent).toEqual(testMessage);
});
