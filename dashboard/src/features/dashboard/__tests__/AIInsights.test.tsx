import { render, screen, fireEvent } from '@testing-library/react';
import { AIInsights } from '../AIInsights';
import { describe, it, expect } from 'vitest';

describe('AIInsights Component', () => {
  it('renders the AI recommendation box', () => {
    render(<AIInsights />);
    expect(screen.getByText("Today's AI Recommendation")).toBeInTheDocument();
    expect(screen.getByText(/Zone D/i)).toBeInTheDocument();
  });

  it('displays the expected congestion reduction', () => {
    render(<AIInsights />);
    expect(screen.getByText('38%')).toBeInTheDocument();
  });

  it('renders the execute protocol button', () => {
    render(<AIInsights />);
    const button = screen.getByRole('button', { name: /Execute Protocol/i });
    expect(button).toBeInTheDocument();
  });
});
