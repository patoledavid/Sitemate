import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IssueList from './IssueList';

describe('IssueList Component', () => {
  const issues = [
    { id: 1, title: 'Issue 1', description: 'Description for issue 1' },
    { id: 2, title: 'Issue 2', description: 'Description for issue 2' }
  ];

  it('renders a list of issues', () => {
    render(<IssueList issues={issues} onUpdate={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText('Issue 1')).toBeInTheDocument();
    expect(screen.getByText('Issue 2')).toBeInTheDocument();
  });

  it('calls onUpdate with the correct data when the update button is clicked', () => {
    const handleUpdate = jest.fn();
    render(<IssueList issues={issues} onUpdate={handleUpdate} onDelete={jest.fn()} />);

    fireEvent.click(screen.getAllByText(/update/i)[0]);
    expect(handleUpdate).toHaveBeenCalledWith(1, { id: 1, title: 'Updated Title', description: 'Description for issue 1' });
  });

  it('calls onDelete with the correct id when the delete button is clicked', () => {
    const handleDelete = jest.fn();
    render(<IssueList issues={issues} onUpdate={jest.fn()} onDelete={handleDelete} />);

    fireEvent.click(screen.getAllByText(/delete/i)[0]);
    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});
