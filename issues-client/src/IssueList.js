import React from 'react';

const IssueList = ({ issues, onUpdate, onDelete }) => {
  return (
    <ul>
      {issues.map(issue => (
        <li key={issue.id}>
          <h2>{issue.title}</h2>
          <p>{issue.description}</p>
          <button onClick={() => onUpdate(issue.id, { ...issue, title: 'Updated Title' })}>Update</button>
          <button onClick={() => onDelete(issue.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default IssueList;
