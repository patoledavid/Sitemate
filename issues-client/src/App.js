import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IssueForm from './IssueForm';
import IssueList from './IssueList';

const App = () => {
  const [issues, setIssues] = useState([]);

  const fetchIssues = async () => {
    const response = await axios.get('http://localhost:3000/issues');
    setIssues(response.data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const createIssue = async (issue) => {
    const response = await axios.post('http://localhost:3000/issues', issue);
    setIssues([...issues, response.data]);
  };

  const updateIssue = async (id, updatedIssue) => {
    const response = await axios.put(`http://localhost:3000/issues/${id}`, updatedIssue);
    setIssues(issues.map(issue => (issue.id === id ? response.data : issue)));
  };

  const deleteIssue = async (id) => {
    await axios.delete(`http://localhost:3000/issues/${id}`);
    setIssues(issues.filter(issue => issue.id !== id));
  };

  return (
    <div>
      <h1>Issue Tracker</h1>
      <IssueForm onCreate={createIssue} />
      <IssueList issues={issues} onUpdate={updateIssue} onDelete={deleteIssue} />
    </div>
  );
};

export default App;
