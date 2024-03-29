require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const authRouter = require('./routes/authRoutes')
app.use('/auth', authRouter);

const doctorRouter = require('./routes/doctorRoutes')
app.use('/auth/doctor', doctorRouter);

const patientRouter = require('./routes/patientRoutes')
app.use('/auth/patient', patientRouter);


const uri = process.env.DB_DOCKER
// const uri = process.env.DB
mongoose
  .connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected!'))
  .catch(err => console.log(err));

console.log("Digital Health Twin")

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});