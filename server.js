const express = require('express');
const cors = require('cors'); // Import the CORS package
const app = express();
const port = 3000;

app.use(cors()); // Use CORS middleware
app.use(express.json());

let issues = [
  { id: 1, title: 'Issue 1', description: 'Description for issue 1' },
  { id: 2, title: 'Issue 2', description: 'Description for issue 2' }
];

// Create
app.post('/issues', (req, res) => {
  const newIssue = req.body;
  issues.push(newIssue);
  console.log('Created:', newIssue);
  res.status(201).send(newIssue);
});

// Read
app.get('/issues', (req, res) => {
  res.send(issues);
});

// Update
app.put('/issues/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedIssue = req.body;
  issues = issues.map(issue => (issue.id === id ? updatedIssue : issue));
  console.log('Updated:', updatedIssue);
  res.send(updatedIssue);
});

// Delete
app.delete('/issues/:id', (req, res) => {
  const id = parseInt(req.params.id);
  issues = issues.filter(issue => issue.id !== id);
  console.log('Deleted issue with id:', id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
