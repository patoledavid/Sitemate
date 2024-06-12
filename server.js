const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Define the Issue model
const Issue = sequelize.define('Issue', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

app.use(cors());
app.use(express.json());

// Create
app.post('/issues', async (req, res) => {
  try {
    const newIssue = await Issue.create(req.body);
    console.log('Created:', newIssue);
    res.status(201).send(newIssue);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read
app.get('/issues', async (req, res) => {
  const issues = await Issue.findAll();
  res.send(issues);
});

// Update
app.put('/issues/:id', async (req, res) => {
  try {
    const updatedIssue = await Issue.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    });
    console.log('Updated:', updatedIssue[1].dataValues);
    res.send(updatedIssue[1]);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete
app.delete('/issues/:id', async (req, res) => {
  try {
    await Issue.destroy({ where: { id: req.params.id } });
    console.log('Deleted issue with id:', req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

// Sync the database and start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
