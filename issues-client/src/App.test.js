import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

describe('App Component', () => {
  it('renders the Issue Tracker heading', () => {
    render(<App />);
    expect(screen.getByText('Issue Tracker')).toBeInTheDocument();
  });

  it('fetches and displays issues', async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: 'Issue 1', description: 'Description for issue 1' },
        { id: 2, title: 'Issue 2', description: 'Description for issue 2' }
      ]
    });

    render(<App />);
    const issueItems = await screen.findAllByRole('listitem');
    expect(issueItems).toHaveLength(2);
    expect(screen.getByText('Issue 1')).toBeInTheDocument();
    expect(screen.getByText('Issue 2')).toBeInTheDocument();
  });
});
