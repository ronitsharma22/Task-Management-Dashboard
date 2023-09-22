const express = require('express');
const cors = require('cors');

const dbConnection = require('./Config/dbConnection');
const router = require('./Routes/router');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// connection to database in Config folder
dbConnection().then(()=>{console.log("Connected to DB")})

app.use('/',router)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });