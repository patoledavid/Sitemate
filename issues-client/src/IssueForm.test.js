import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IssueForm from './IssueForm';

describe('IssueForm Component', () => {
  it('renders the form fields', () => {
    render(<IssueForm onCreate={jest.fn()} />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('calls onCreate with the correct data when submitted', () => {
    const handleCreate = jest.fn();
    render(<IssueForm onCreate={handleCreate} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Issue' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'New Description' } });
    fireEvent.click(screen.getByText(/create issue/i));

    expect(handleCreate).toHaveBeenCalledWith({
      id: expect.any(Number),
      title: 'New Issue',
      description: 'New Description'
    });
  });
});
