import { render, screen } from '@testing-library/react';
import { StatsGrid } from '../StatsGrid';
import { describe, it, expect } from 'vitest';

describe('StatsGrid Component', () => {
  const mockZones = [
    { id: '1', name: 'South Gate', density: 90, status: 'critical', capacity: 1000 },
    { id: '2', name: 'North Gate', density: 40, status: 'nominal', capacity: 1000 }
  ];

  it('renders correctly with average density', () => {
    render(<StatsGrid zones={mockZones} users={[]} campaigns={[]} />);
    
    // Average of 90 and 40 is 65
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('Current Density')).toBeInTheDocument();
  });

  it('identifies critical zones accurately', () => {
    render(<StatsGrid zones={mockZones} users={[]} campaigns={[]} />);
    
    // 1 zone is > 85
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Critical Alerts')).toBeInTheDocument();
  });
});
