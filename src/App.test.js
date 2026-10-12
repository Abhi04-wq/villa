import { render, screen } from '@testing-library/react';
import App from './App';

test('renders cinematic hero headline', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Designed/i);
  expect(screen.getAllByRole('link', { name: /start a project/i }).length).toBeGreaterThan(0);
});

test('renders key sections with accessible landmarks', () => {
  render(<App />);
  expect(screen.getByLabelText(/capabilities/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/contact/i)).toBeInTheDocument();
  expect(screen.getByText(/skip to content/i)).toBeInTheDocument();
});
