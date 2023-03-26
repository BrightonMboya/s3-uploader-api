const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
var bodyParser = require('body-parser');
const routes = require('./routes');
const multer = require("multer")


dotenv.config();

const app = express();
const port = process.env.PORT || 80;
// const upload = multer()

app.use(cors());
// app.use(upload.array())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.json({limit: '50mb', extended: true}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

app.use('/api/v1', routes);

var server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);

});
