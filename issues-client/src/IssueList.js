import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

const IssueList = ({ issues, onUpdate, onDelete }) => {
  return (
    <ListGroup>
      {issues.map(issue => (
        <ListGroupItem key={issue.id}>
          <h5>{issue.title}</h5>
          <p>{issue.description}</p>
          <Button color="warning" className="mr-2" onClick={() => onUpdate(issue.id, { ...issue, title: 'Updated Title' })}>Update</Button>
          <Button color="danger" onClick={() => onDelete(issue.id)}>Delete</Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default IssueList;
