import { render, screen, fireEvent } from '@testing-library/react';
import { ActiveCampaigns } from '../ActiveCampaigns';
import { describe, it, expect, vi } from 'vitest';

// Mock fetch globally
global.fetch = vi.fn();

describe('ActiveCampaigns Component', () => {
  it('renders empty state when no campaigns exist', () => {
    render(<ActiveCampaigns campaigns={[]} />);
    expect(screen.getByText(/No active AI negotiations/i)).toBeInTheDocument();
  });

  it('renders a list of campaigns when provided', () => {
    const mockCampaigns = [
      { id: '1', target_zone: 'east_gate', budget: 10, available_perks: [], active: true }
    ];
    render(<ActiveCampaigns campaigns={mockCampaigns} />);
    expect(screen.getByText(/east gate/i)).toBeInTheDocument();
    expect(screen.getByText(/\$10\/fan/i)).toBeInTheDocument();
  });

  it('calls deploy API when Deploy Aura Campaign button is clicked', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ success: true })
    });

    render(<ActiveCampaigns campaigns={[]} />);
    const deployButtons = screen.getAllByRole('button');
    // The second button is the massive Deploy Aura Campaign button
    fireEvent.click(deployButtons[1]);
    
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
