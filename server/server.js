const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Sample Auburn University facts
let auburnFacts = [
  "Auburn University was established in 1856.",
  "Auburn University's mascot is Aubie.",
  "Auburn University is home to the famous Toomer's Corner oak trees.",
  "Auburn's colors are orange and blue."
];

// Route to get a random Auburn University fact
app.get('/auburnfacts', (req, res) => {
  const randomFact = auburnFacts[Math.floor(Math.random() * auburnFacts.length)];
  res.json({ fact: randomFact });
});

app.get('/auburnfacts/facts/all', (req, res) => {
  res.json({ facts: auburnFacts });
});

// Route to get an Auburn U fact by index
app.get('/auburnfacts/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < auburnFacts.length) {
        const requestedFact = auburnFacts[req.params.index];
        res.status(200).json({ fact: requestedFact });
    } else {
        res.status(404).json({ error: 'Fact not found.'});
    }
});

// Route to add a new Auburn University fact
app.post('/auburnfacts', (req, res) => {
  const { fact } = req.body;
  auburnFacts.push(fact);
  res.status(200).json({ message: `Fact: '${fact}', added successfully.`});
});

// Route to update an Auburn University fact by index
app.put('/auburnfacts/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < auburnFacts.length) {
    const { fact } = req.body;
    auburnFacts[index] = fact;
    res.json({ message: 'Fact updated successfully.' });
  } else {
    res.status(404).json({ error: 'Fact not found.' });
  }
});

// Route to delete an Auburn University fact by index
app.delete('/auburnfacts/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < auburnFacts.length) {
    auburnFacts.splice(index, 1);
    res.json({ message: 'Fact deleted successfully' });
  } else {
    res.status(404).json({ error: 'Fact not found' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
