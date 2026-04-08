const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

global.Issue = require('./api/models/issueModel');
const routes = require('./api/routes/issueRoutes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/helpdesk-library', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(port);

console.log('helpdesk library RESTful API server started on: ' + port);
