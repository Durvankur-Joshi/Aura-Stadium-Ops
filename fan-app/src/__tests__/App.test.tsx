import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { describe, it, expect, vi, beforeEach } from 'vitest';

global.fetch = vi.fn();

describe('Fan App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the initial AI greeting', () => {
    render(<App />);
    expect(screen.getByText(/I'm Aura, your AI event companion/i)).toBeInTheDocument();
  });

  it('renders Quick Action buttons', () => {
    render(<App />);
    expect(screen.getByText('Food nearby')).toBeInTheDocument();
    expect(screen.getByText('Report Fire')).toBeInTheDocument();
  });

  it('triggers a fetch request when a quick action is clicked', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ speech: "Here is food.", status: "informational" })
    });

    render(<App />);
    const foodButton = screen.getByText('Food nearby');
    fireEvent.click(foodButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    
    // Check if the user message was added to the screen
    expect(screen.getAllByText('Food nearby').length).toBeGreaterThan(1);
  });
});
