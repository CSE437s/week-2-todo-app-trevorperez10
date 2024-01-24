
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const taskRoutes = require('./routes/tasks'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/tasks', taskRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
